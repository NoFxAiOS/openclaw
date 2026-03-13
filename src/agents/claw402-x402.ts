/**
 * claw402 x402 Payment Fetch
 *
 * Patches globalThis.fetch to handle x402 micropayments for claw402 requests:
 *   Request to claw402.ai → 402 (with price header) → sign USDC on Base → retry → response
 *
 * Non-claw402 requests pass through unchanged.
 *
 * Uses @x402/fetch client + viem for EVM signing.
 */

import { toClientEvmSigner } from "@x402/evm";
import { registerExactEvmScheme } from "@x402/evm/exact/client";
import { wrapFetchWithPayment, x402Client } from "@x402/fetch";
import { createPublicClient, http } from "viem";
import { base } from "viem/chains";
import { CLAW402_DEFAULT_BASE_URL } from "./claw402-models.js";
import { loadOrCreateWallet } from "./claw402-wallet.js";

let installed = false;

/**
 * Install the x402 payment interceptor on globalThis.fetch.
 *
 * Only intercepts requests to the claw402 gateway URL.
 * All other requests pass through to the original fetch.
 *
 * Safe to call multiple times — only installs once.
 */
export function installClaw402PaymentFetch(): void {
  if (installed) {
    return;
  }

  const wallet = loadOrCreateWallet();
  const claw402BaseUrl = (process.env.CLAW402_BASE_URL?.trim() || CLAW402_DEFAULT_BASE_URL).replace(
    /\/$/,
    "",
  );

  const evmPublicClient = createPublicClient({
    chain: base,
    transport: http(),
  });

  const evmSigner = toClientEvmSigner(wallet.account, evmPublicClient);
  const client = new x402Client();
  registerExactEvmScheme(client, { signer: evmSigner });

  const originalFetch = globalThis.fetch;
  const payFetch = wrapFetchWithPayment(originalFetch, client);

  const claw402Fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
    const url =
      typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;

    // Only use payFetch for claw402 requests
    if (url.startsWith(claw402BaseUrl)) {
      // Strip headers that interfere with claw402 gateway:
      // - Authorization: x402 uses PAYMENT-SIGNATURE header, not Authorization
      // - user-agent containing "OpenAI": Cloudflare WAF blocks bot-like UAs
      // - x-stainless-*: OpenAI SDK telemetry headers (unnecessary noise)
      const sanitizeHeaders = (h: Headers) => {
        h.delete("authorization");
        for (const key of h.keys()) {
          if (key.startsWith("x-stainless")) {
            h.delete(key);
          }
        }
        const ua = h.get("user-agent");
        if (ua && /openai/i.test(ua)) {
          h.set("user-agent", "claw402-client/1.0");
        }
      };
      if (init?.headers) {
        const h = new Headers(init.headers);
        sanitizeHeaders(h);
        init = { ...init, headers: h };
      }
      if (input instanceof Request) {
        const h = new Headers(input.headers);
        sanitizeHeaders(h);
        input = new Request(input, { headers: h });
      }
      return payFetch(input, init).then((res: Response) => {
        if (res.status === 402) {
          throw new Error(
            `[claw402] Payment required but wallet has insufficient USDC balance.\n` +
              `Wallet: ${wallet.address}\n` +
              `Check balance: https://basescan.org/address/${wallet.address}\n` +
              `Fund your wallet with USDC on Base chain.\n` +
              `Run 'openclaw wallet' to see your address and QR code.`,
          );
        }
        if (res.status === 403) {
          throw new Error(
            `[claw402] Payment failed (403). Your wallet may have insufficient USDC on Base chain.\n` +
              `Wallet: ${wallet.address}\n` +
              `Check balance: https://basescan.org/address/${wallet.address}\n` +
              `Run 'openclaw wallet' to see your address and QR code.`,
          );
        }
        return res;
      });
    }

    return originalFetch(input, init);
  }) as typeof fetch;

  // Patch globalThis.fetch for code that uses the global directly
  globalThis.fetch = claw402Fetch;

  // Also store on a well-known global so bundled code (e.g. OpenAI SDK in ESM)
  // can explicitly pick it up — bare `fetch` in Node ESM may not reflect
  // globalThis.fetch reassignment.
  (globalThis as Record<string, unknown>).__claw402Fetch = claw402Fetch;

  installed = true;

  // Wallet info is shown during onboarding and gateway startup logs.
  // Only log here if not in a TTY (non-interactive / daemon mode).
  if (!process.stdout.isTTY) {
    console.log(`[claw402] Wallet: ${wallet.address}`);
    console.log(`[claw402] Gateway: ${claw402BaseUrl}`);
    console.log(`[claw402] Fund your wallet with USDC on Base to start using AI models`);
  }
}
