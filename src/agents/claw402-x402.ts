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

  globalThis.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
    const url =
      typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;

    // Only use payFetch for claw402 requests
    if (url.startsWith(claw402BaseUrl)) {
      return payFetch(input, init);
    }

    return originalFetch(input, init);
  }) as typeof fetch;

  installed = true;

  // Log wallet info for user
  console.log(`[claw402] Wallet: ${wallet.address}`);
  console.log(`[claw402] Gateway: ${claw402BaseUrl}`);
  console.log(`[claw402] Fund your wallet with USDC on Base to start using AI models`);
}
