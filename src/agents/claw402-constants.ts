/**
 * Shared constants for claw402 x402 payment integration.
 */

/** USDC token contract address on Base (Chain ID 8453) */
export const USDC_BASE_CONTRACT = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

/** Base chain ID */
export const BASE_CHAIN_ID = 8453;

/**
 * Build an EIP-681 payment URI for wallet QR codes.
 * Wallets like MetaMask/Coinbase Wallet auto-fill chain + token + recipient when scanned.
 */
export function buildUsdcPaymentUri(walletAddress: string): string {
  return `ethereum:${USDC_BASE_CONTRACT}@${BASE_CHAIN_ID}/transfer?address=${walletAddress}`;
}
