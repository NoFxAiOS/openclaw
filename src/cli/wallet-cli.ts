/**
 * openclaw wallet — manage claw402 USDC wallet
 *
 * Commands:
 *   openclaw wallet          Show current wallet address + QR code
 *   openclaw wallet import   Import an existing private key
 *   openclaw wallet generate Generate a new wallet (replaces existing)
 */

import { existsSync, writeFileSync, mkdirSync, readFileSync, renameSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import type { Command } from "commander";
import qrcode from "qrcode-terminal";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

const WALLET_DIR = join(homedir(), ".openclaw", "claw402");
const WALLET_KEY_FILE = join(WALLET_DIR, "wallet.key");

function ensureWalletDir(): void {
  if (!existsSync(WALLET_DIR)) {
    mkdirSync(WALLET_DIR, { recursive: true, mode: 0o700 });
  }
}

function normalizePrivateKey(key: string): `0x${string}` {
  const trimmed = key.trim();
  return (trimmed.startsWith("0x") ? trimmed : `0x${trimmed}`) as `0x${string}`;
}

function showWallet(): void {
  if (!existsSync(WALLET_KEY_FILE)) {
    console.log("No wallet found. Run: openclaw wallet generate");
    return;
  }
  const key = normalizePrivateKey(readFileSync(WALLET_KEY_FILE, "utf-8"));
  const account = privateKeyToAccount(key);
  console.log("");
  console.log(`  💰 Wallet Address: ${account.address}`);
  console.log(`  📁 Key file: ${WALLET_KEY_FILE}`);
  console.log("");
  console.log("  Scan to send USDC (Base chain):");
  console.log("");
  qrcode.generate(account.address, { small: true });
  console.log("");
}

export function registerWalletCli(program: Command): void {
  const wallet = program
    .command("wallet")
    .description("Manage claw402 USDC wallet")
    .action(() => {
      showWallet();
    });

  wallet
    .command("import")
    .description("Import a private key")
    .argument("<privateKey>", "Private key (hex, with or without 0x prefix)")
    .action((privateKey: string) => {
      const key = normalizePrivateKey(privateKey);
      const account = privateKeyToAccount(key);

      // Backup existing wallet
      if (existsSync(WALLET_KEY_FILE)) {
        const backupPath = `${WALLET_KEY_FILE}.backup.${Date.now()}`;
        renameSync(WALLET_KEY_FILE, backupPath);
        console.log(`  ⚠️  Previous wallet backed up to: ${backupPath}`);
      }

      ensureWalletDir();
      writeFileSync(WALLET_KEY_FILE, key, { mode: 0o600 });
      console.log("");
      console.log(`  ✅ Wallet imported: ${account.address}`);
      console.log(`  📁 Key file: ${WALLET_KEY_FILE}`);
      console.log("");
      qrcode.generate(account.address, { small: true });
      console.log("");
    });

  wallet
    .command("generate")
    .description("Generate a new wallet (backs up existing)")
    .action(() => {
      // Backup existing wallet
      if (existsSync(WALLET_KEY_FILE)) {
        const backupPath = `${WALLET_KEY_FILE}.backup.${Date.now()}`;
        renameSync(WALLET_KEY_FILE, backupPath);
        console.log(`  ⚠️  Previous wallet backed up to: ${backupPath}`);
      }

      ensureWalletDir();
      const key = generatePrivateKey();
      writeFileSync(WALLET_KEY_FILE, key, { mode: 0o600 });
      const account = privateKeyToAccount(key);
      console.log("");
      console.log(`  ✅ New wallet generated: ${account.address}`);
      console.log(`  📁 Key file: ${WALLET_KEY_FILE}`);
      console.log("");
      console.log("  Scan to send USDC (Base chain):");
      console.log("");
      qrcode.generate(account.address, { small: true });
      console.log("");
    });
}
