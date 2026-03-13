# 🦞 OpenClaw402 — Pay-per-use AI Assistant with USDC

> **OpenClaw402** is a customized version of [OpenClaw](https://github.com/openclaw/openclaw), integrated with the [claw402](https://claw402.ai) x402 micropayment gateway. No API keys needed — pay as you go with USDC on Base.

## ✨ Features

- **Zero-config AI** — No OpenAI/Anthropic/Google API keys required
- **USDC Pay-per-use** — Base chain USDC micropayments, billed per token, pay only for what you use
- **Non-custodial Wallet** — Private key stored locally only (`~/.openclaw/claw402/wallet.key`), never uploaded
- **22+ Models** — Access OpenAI, Anthropic, DeepSeek, Qwen, Gemini, Grok, Kimi and more via the claw402 gateway
- **Omnichannel** — WhatsApp, Telegram, Discord, Slack, Signal, iMessage, WeChat and 20+ platforms
- **Voice** — macOS/iOS/Android voice input & output
- **Canvas** — Real-time controllable canvas rendering
- **Full OpenClaw Features** — All upstream capabilities preserved

## 🚀 Quick Install

```bash
curl -fsSL https://claw402.ai/install.sh | bash
```

The install script will automatically:

1. Install Node.js (if not present)
2. Download the OpenClaw402 source
3. Build the project
4. Launch the setup wizard (generate wallet + configure channels)

After installation:

```bash
source ~/.bashrc   # or source ~/.zshrc
openclaw           # start
```

## 💰 Wallet Management

A Base chain wallet is generated automatically during setup, with a QR code for easy funding.

```bash
openclaw wallet            # View wallet address + QR code
openclaw wallet generate   # Generate new wallet (auto-backs up old wallet)
openclaw wallet import <key>  # Import existing private key
```

**Funding:** Use any Base-compatible wallet (Coinbase Wallet, MetaMask, OKX, etc.) to send USDC to your address.

## 🔧 How It Works

```
User request → OpenClaw402 → fetch(claw402.ai) → 402 Payment Required
             → Auto-sign USDC payment → claw402 forwards to AI provider → Response
```

Built on the [x402 protocol](https://www.x402.org/). Each API call automatically completes an on-chain USDC payment — no manual steps required.

## 📦 Available Models

Models accessible via the claw402 gateway (continuously updated):

| Provider  | Models                                        |
| --------- | --------------------------------------------- |
| OpenAI    | GPT-5.4, GPT-5.4 Pro, GPT-5 Mini, o3, o4-mini |
| Anthropic | Claude Opus 4.6, Claude Sonnet 4.6            |
| Google    | Gemini 3.1 Pro, Gemini 3 Flash                |
| DeepSeek  | DeepSeek Chat, DeepSeek Reasoner              |
| Alibaba   | Qwen Max, Qwen Plus                           |
| xAI       | Grok 3                                        |
| Moonshot  | Kimi K2                                       |

See live model list and pricing: [claw402.ai](https://claw402.ai)

## 🔄 Update

```bash
curl -fsSL https://claw402.ai/install.sh | bash
```

Re-run the install script to update. Existing config and wallet are preserved.

## ⚙️ Environment Variables

| Variable             | Description                                            |
| -------------------- | ------------------------------------------------------ |
| `CLAW402_WALLET_KEY` | Specify wallet private key directly (highest priority) |

## 📁 File Locations

| Path                             | Description           |
| -------------------------------- | --------------------- |
| `~/openclaw402/`                 | Source + build output |
| `~/.openclaw/`                   | Config + workspace    |
| `~/.openclaw/claw402/wallet.key` | Wallet private key ⚠️ |
| `~/.local/bin/openclaw`          | Launch script         |

## 🗑️ Uninstall

```bash
rm -rf ~/openclaw402 ~/.local/bin/openclaw
# To fully remove (including config and wallet):
# rm -rf ~/.openclaw
# ⚠️ Back up ~/.openclaw/claw402/wallet.key first if your wallet has a balance
```

## 🔗 Links

- **claw402 Gateway**: [claw402.ai](https://claw402.ai)
- **OpenClaw Upstream**: [github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)
- **OpenClaw Docs**: [docs.openclaw.ai](https://docs.openclaw.ai)
- **x402 Protocol**: [x402.org](https://www.x402.org/)

## 📄 License

MIT — Based on [OpenClaw](https://github.com/openclaw/openclaw).
