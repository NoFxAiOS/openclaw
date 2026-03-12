# 🦞 OpenClaw402 — Pay-per-use AI Assistant with USDC

> **OpenClaw402** 是 [OpenClaw](https://github.com/openclaw/openclaw) 的定制版，集成了 [claw402](https://claw402.ai) x402 微支付网关。无需 API Key，用 Base 链 USDC 即用即付。

## ✨ 特性

- **零配置 AI** — 不需要 OpenAI/Anthropic/Google 等 API Key
- **USDC 即用即付** — Base 链 USDC 微支付，按 token 计费，用多少付多少
- **非托管钱包** — 私钥只存在你本地 (`~/.openclaw/claw402/wallet.key`)，从不上传
- **22+ 模型** — 通过 claw402 网关访问 OpenAI、Anthropic、DeepSeek、Qwen、Gemini、Grok、Kimi 等
- **全渠道** — WhatsApp、Telegram、Discord、Slack、Signal、iMessage、微信（WeChat）等 20+ 平台
- **语音交互** — macOS/iOS/Android 语音输入输出
- **Canvas** — 实时可控的画布渲染
- **完整 OpenClaw 功能** — 所有原版功能都保留

## 🚀 一键安装

```bash
curl -fsSL https://claw402.ai/install.sh | bash
```

安装脚本会自动：

1. 安装 Node.js（如果没有）
2. 下载 OpenClaw402 源码
3. 构建项目
4. 进入引导向导（生成钱包 + 配置频道）

安装完成后：

```bash
source ~/.bashrc   # 或 source ~/.zshrc
openclaw           # 启动
```

## 💰 钱包管理

安装时自动生成 Base 链钱包，显示 QR 码方便充值。

```bash
openclaw wallet            # 查看钱包地址 + QR 码
openclaw wallet generate   # 生成新钱包（自动备份旧钱包）
openclaw wallet import <key>  # 导入已有私钥
```

**充值方式：** 使用任意支持 Base 链的钱包（Coinbase Wallet、MetaMask、OKX 等）向你的地址转入 USDC。

## 🔧 工作原理

```
用户请求 → OpenClaw402 → fetch(claw402.ai) → 402 Payment Required
         → 自动签名 USDC 支付 → claw402 收款转发给 AI 供应商 → 返回结果
```

基于 [x402 协议](https://www.x402.org/)，每次 API 调用自动完成链上 USDC 支付，无需手动操作。

## 📦 可用模型

通过 claw402 网关访问以下模型（持续更新）：

| Provider  | 模型                                          |
| --------- | --------------------------------------------- |
| OpenAI    | GPT-5.4, GPT-5.4 Pro, GPT-5 Mini, o3, o4-mini |
| Anthropic | Claude Opus 4.6, Claude Sonnet 4.6            |
| Google    | Gemini 3.1 Pro, Gemini 3 Flash                |
| DeepSeek  | DeepSeek Chat, DeepSeek Reasoner              |
| Alibaba   | Qwen Max, Qwen Plus                           |
| xAI       | Grok 3                                        |
| Moonshot  | Kimi K2                                       |

查看实时模型列表和定价：[claw402.ai](https://claw402.ai)

## 🔄 更新

```bash
curl -fsSL https://claw402.ai/install.sh | bash
```

重新运行安装脚本即可更新到最新版本。已有配置和钱包不会被覆盖。

## ⚙️ 环境变量

| 变量                 | 说明                           |
| -------------------- | ------------------------------ |
| `CLAW402_WALLET_KEY` | 直接指定钱包私钥（优先级最高） |

## 📁 文件位置

| 路径                             | 说明             |
| -------------------------------- | ---------------- |
| `~/openclaw402/`                 | 源码 + 构建产物  |
| `~/.openclaw/`                   | 配置 + workspace |
| `~/.openclaw/claw402/wallet.key` | 钱包私钥 ⚠️      |
| `~/.local/bin/openclaw`          | 启动脚本         |

## 🗑️ 卸载

```bash
rm -rf ~/openclaw402 ~/.local/bin/openclaw
# 如需完全清除（包括配置和钱包）：
# rm -rf ~/.openclaw
# ⚠️ 请先备份 ~/.openclaw/claw402/wallet.key（如果钱包里有余额）
```

## 🔗 相关链接

- **claw402 网关**: [claw402.ai](https://claw402.ai)
- **OpenClaw 原版**: [github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)
- **OpenClaw 文档**: [docs.openclaw.ai](https://docs.openclaw.ai)
- **x402 协议**: [x402.org](https://www.x402.org/)

## 📄 License

MIT — 基于 [OpenClaw](https://github.com/openclaw/openclaw) 定制。
