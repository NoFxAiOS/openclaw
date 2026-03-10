/**
 * claw402 Wallet Management
 *
 * Manages an EVM wallet for x402 micropayments to claw402 gateway.
 * Wallet private key is stored locally at ~/.openclaw/claw402/wallet.key
 *
 * Usage:
 *   - Auto-generates wallet on first use (user can also import)
 *   - Signs USDC payments on Base chain for each LLM request
 *   - Non-custodial: private key never leaves the machine
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import type { PrivateKeyAccount } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

const WALLET_DIR = join(homedir(), ".openclaw", "claw402");
const WALLET_KEY_FILE = join(WALLET_DIR, "wallet.key");

export interface Claw402Wallet {
  account: PrivateKeyAccount;
  address: string;
  privateKey: `0x${string}`;
}

/**
 * Load or create the claw402 wallet.
 *
 * Priority:
 *   1. CLAW402_WALLET_KEY env var
 *   2. ~/.openclaw/claw402/wallet.key file
 *   3. Auto-generate new wallet and save to file
 */
export function loadOrCreateWallet(): Claw402Wallet {
  let privateKey: `0x${string}` | undefined;

  // 1. Check env var
  const envKey = process.env.CLAW402_WALLET_KEY?.trim();
  if (envKey) {
    privateKey = normalizePrivateKey(envKey);
  }

  // 2. Check file
  if (!privateKey && existsSync(WALLET_KEY_FILE)) {
    const fileContent = readFileSync(WALLET_KEY_FILE, "utf-8").trim();
    if (fileContent) {
      privateKey = normalizePrivateKey(fileContent);
    }
  }

  // 3. Auto-generate
  if (!privateKey) {
    privateKey = generatePrivateKey();
    ensureWalletDir();
    writeFileSync(WALLET_KEY_FILE, privateKey, { mode: 0o600 });
  }

  const account = privateKeyToAccount(privateKey);
  return {
    account,
    address: account.address,
    privateKey,
  };
}

/**
 * Check if a wallet is configured (env var or file exists).
 */
export function hasWalletConfigured(): boolean {
  if (process.env.CLAW402_WALLET_KEY?.trim()) {
    return true;
  }
  return existsSync(WALLET_KEY_FILE);
}

/**
 * Get wallet address without loading full account (for display).
 */
export function getWalletAddress(): string | undefined {
  try {
    const wallet = loadOrCreateWallet();
    return wallet.address;
  } catch {
    return undefined;
  }
}

function normalizePrivateKey(key: string): `0x${string}` {
  const trimmed = key.trim();
  if (trimmed.startsWith("0x")) {
    return trimmed as `0x${string}`;
  }
  return `0x${trimmed}`;
}

function ensureWalletDir(): void {
  if (!existsSync(WALLET_DIR)) {
    mkdirSync(WALLET_DIR, { recursive: true, mode: 0o700 });
  }
}
