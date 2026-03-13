/**
 * claw402 — x402 micropayment API gateway
 *
 * Access OpenAI, Anthropic, DeepSeek, Qwen, Gemini, Grok, and Kimi models
 * without API keys. Pay per request with USDC on Base chain, or use a
 * prepaid balance with API key.
 *
 * Gateway: https://claw402.ai
 * Source:  https://github.com/NoFxAiOS/claw402
 */
import type { ModelDefinitionConfig } from "../config/types.models.js";

export const CLAW402_DEFAULT_BASE_URL = "https://claw402.ai";

// ── Anthropic (via Bedrock) ──
// anthropic-messages API through /api/v1/ai/anthropic/*

export const CLAW402_ANTHROPIC_MODELS: ModelDefinitionConfig[] = [
  {
    id: "claude-opus-4.6",
    name: "Claude Opus 4.6 (claw402)",
    api: "anthropic-messages",
    reasoning: true,
    input: ["text", "image"],
    cost: { input: 7.0, output: 35.0, cacheRead: 0.7, cacheWrite: 7.0 },
    contextWindow: 200000,
    maxTokens: 32768,
  },
  {
    id: "claude-sonnet-4.6",
    name: "Claude Sonnet 4.6 (claw402)",
    api: "anthropic-messages",
    reasoning: true,
    input: ["text", "image"],
    cost: { input: 3.0, output: 15.0, cacheRead: 0.3, cacheWrite: 3.0 },
    contextWindow: 200000,
    maxTokens: 16384,
  },
];

// ── OpenAI ──
// openai-completions API through /api/v1/ai/openai/*

export const CLAW402_OPENAI_MODELS: ModelDefinitionConfig[] = [
  {
    id: "gpt-5.4",
    name: "GPT-5.4 (claw402)",
    api: "openai-completions",
    reasoning: false,
    input: ["text", "image"],
    cost: { input: 2.5, output: 10.0, cacheRead: 1.25, cacheWrite: 2.5 },
    contextWindow: 1000000,
    maxTokens: 32768,
  },
  {
    id: "gpt-5.4-pro",
    name: "GPT-5.4 Pro (claw402)",
    api: "openai-completions",
    reasoning: true,
    input: ["text", "image"],
    cost: { input: 10.0, output: 40.0, cacheRead: 5.0, cacheWrite: 10.0 },
    contextWindow: 1000000,
    maxTokens: 32768,
  },
  {
    id: "gpt-5.3",
    name: "GPT-5.3 (claw402)",
    api: "openai-completions",
    reasoning: false,
    input: ["text", "image"],
    cost: { input: 1.1, output: 4.4, cacheRead: 0.55, cacheWrite: 1.1 },
    contextWindow: 200000,
    maxTokens: 16384,
  },
  {
    id: "gpt-5-mini",
    name: "GPT-5 Mini (claw402)",
    api: "openai-completions",
    reasoning: false,
    input: ["text", "image"],
    cost: { input: 0.15, output: 0.6, cacheRead: 0.075, cacheWrite: 0.15 },
    contextWindow: 1000000,
    maxTokens: 16384,
  },
];

// ── DeepSeek ──
// openai-completions API through /api/v1/ai/deepseek/*

export const CLAW402_DEEPSEEK_MODELS: ModelDefinitionConfig[] = [
  {
    id: "deepseek-chat",
    name: "DeepSeek Chat V3 (claw402)",
    api: "openai-completions",
    reasoning: false,
    input: ["text"],
    cost: { input: 0.27, output: 1.1, cacheRead: 0.07, cacheWrite: 0.27 },
    contextWindow: 131072,
    maxTokens: 8192,
  },
  {
    id: "deepseek-reasoner",
    name: "DeepSeek Reasoner (claw402)",
    api: "openai-completions",
    reasoning: true,
    input: ["text"],
    cost: { input: 0.55, output: 2.19, cacheRead: 0.14, cacheWrite: 0.55 },
    contextWindow: 131072,
    maxTokens: 8192,
  },
];

// ── Qwen ──
// openai-completions API through /api/v1/ai/qwen/*

export const CLAW402_QWEN_MODELS: ModelDefinitionConfig[] = [
  {
    id: "qwen3-max",
    name: "Qwen3 Max (claw402)",
    api: "openai-completions",
    reasoning: false,
    input: ["text"],
    cost: { input: 1.6, output: 6.4, cacheRead: 0.16, cacheWrite: 1.6 },
    contextWindow: 131072,
    maxTokens: 8192,
  },
  {
    id: "qwen-plus",
    name: "Qwen Plus (claw402)",
    api: "openai-completions",
    reasoning: false,
    input: ["text"],
    cost: { input: 0.8, output: 2.0, cacheRead: 0.08, cacheWrite: 0.8 },
    contextWindow: 131072,
    maxTokens: 8192,
  },
  {
    id: "qwen-turbo",
    name: "Qwen Turbo (claw402)",
    api: "openai-completions",
    reasoning: false,
    input: ["text"],
    cost: { input: 0.3, output: 0.6, cacheRead: 0.03, cacheWrite: 0.3 },
    contextWindow: 131072,
    maxTokens: 8192,
  },
  {
    id: "qwen-flash",
    name: "Qwen Flash (claw402)",
    api: "openai-completions",
    reasoning: false,
    input: ["text"],
    cost: { input: 0.0, output: 0.0, cacheRead: 0.0, cacheWrite: 0.0 },
    contextWindow: 131072,
    maxTokens: 8192,
  },
  {
    id: "qwen-coder",
    name: "Qwen3 Coder Plus (claw402)",
    api: "openai-completions",
    reasoning: false,
    input: ["text"],
    cost: { input: 0.8, output: 2.0, cacheRead: 0.08, cacheWrite: 0.8 },
    contextWindow: 131072,
    maxTokens: 8192,
  },
  {
    id: "qwen-vl",
    name: "Qwen VL Plus (claw402)",
    api: "openai-completions",
    reasoning: false,
    input: ["text", "image"],
    cost: { input: 0.8, output: 2.0, cacheRead: 0.08, cacheWrite: 0.8 },
    contextWindow: 131072,
    maxTokens: 8192,
  },
];

// ── Gemini ──
// openai-completions API through /api/v1/ai/gemini/*

export const CLAW402_GEMINI_MODELS: ModelDefinitionConfig[] = [
  {
    id: "gemini-3.1-pro",
    name: "Gemini 3.1 Pro (claw402)",
    api: "openai-completions",
    reasoning: true,
    input: ["text", "image"],
    cost: { input: 1.25, output: 10.0, cacheRead: 0.31, cacheWrite: 1.25 },
    contextWindow: 1000000,
    maxTokens: 65536,
  },
  {
    id: "gemini-3-flash",
    name: "Gemini 3 Flash (claw402)",
    api: "openai-completions",
    reasoning: false,
    input: ["text", "image"],
    cost: { input: 0.15, output: 0.6, cacheRead: 0.04, cacheWrite: 0.15 },
    contextWindow: 1000000,
    maxTokens: 65536,
  },
  {
    id: "gemini-3.1-flash-lite",
    name: "Gemini 3.1 Flash Lite (claw402)",
    api: "openai-completions",
    reasoning: false,
    input: ["text", "image"],
    cost: { input: 0.075, output: 0.3, cacheRead: 0.02, cacheWrite: 0.075 },
    contextWindow: 1000000,
    maxTokens: 65536,
  },
  {
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro (claw402)",
    api: "openai-completions",
    reasoning: true,
    input: ["text", "image"],
    cost: { input: 1.25, output: 10.0, cacheRead: 0.31, cacheWrite: 1.25 },
    contextWindow: 1000000,
    maxTokens: 65536,
  },
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash (claw402)",
    api: "openai-completions",
    reasoning: false,
    input: ["text", "image"],
    cost: { input: 0.15, output: 0.6, cacheRead: 0.04, cacheWrite: 0.15 },
    contextWindow: 1000000,
    maxTokens: 65536,
  },
  {
    id: "gemini-2.5-flash-lite",
    name: "Gemini 2.5 Flash Lite (claw402)",
    api: "openai-completions",
    reasoning: false,
    input: ["text", "image"],
    cost: { input: 0.075, output: 0.3, cacheRead: 0.02, cacheWrite: 0.075 },
    contextWindow: 1000000,
    maxTokens: 65536,
  },
];

// ── Grok (xAI) ──
// openai-completions API through /api/v1/ai/grok/*

export const CLAW402_GROK_MODELS: ModelDefinitionConfig[] = [
  {
    id: "grok-4.1",
    name: "Grok 4.1 (claw402)",
    api: "openai-completions",
    reasoning: true,
    input: ["text", "image"],
    cost: { input: 3.0, output: 15.0, cacheRead: 0.75, cacheWrite: 3.0 },
    contextWindow: 256000,
    maxTokens: 16384,
  },
  {
    id: "grok-4.1-fast",
    name: "Grok 4.1 Fast (claw402)",
    api: "openai-completions",
    reasoning: false,
    input: ["text", "image"],
    cost: { input: 3.0, output: 15.0, cacheRead: 0.75, cacheWrite: 3.0 },
    contextWindow: 256000,
    maxTokens: 16384,
  },
  {
    id: "grok-4",
    name: "Grok 4 (claw402)",
    api: "openai-completions",
    reasoning: true,
    input: ["text", "image"],
    cost: { input: 3.0, output: 15.0, cacheRead: 0.75, cacheWrite: 3.0 },
    contextWindow: 256000,
    maxTokens: 16384,
  },
  {
    id: "grok-3-mini",
    name: "Grok 3 Mini (claw402)",
    api: "openai-completions",
    reasoning: false,
    input: ["text"],
    cost: { input: 0.3, output: 0.5, cacheRead: 0.08, cacheWrite: 0.3 },
    contextWindow: 131072,
    maxTokens: 8192,
  },
];

// ── Kimi (Moonshot) ──
// openai-completions API through /api/v1/ai/kimi/*

export const CLAW402_KIMI_MODELS: ModelDefinitionConfig[] = [
  {
    id: "kimi-k2.5",
    name: "Kimi K2.5 (claw402)",
    api: "openai-completions",
    reasoning: true,
    input: ["text"],
    cost: { input: 0.5, output: 2.8, cacheRead: 0.13, cacheWrite: 0.5 },
    contextWindow: 262144,
    maxTokens: 16384,
  },
  {
    id: "kimi-k2",
    name: "Kimi K2 (claw402)",
    api: "openai-completions",
    reasoning: false,
    input: ["text"],
    cost: { input: 0.35, output: 1.4, cacheRead: 0.09, cacheWrite: 0.35 },
    contextWindow: 256000,
    maxTokens: 16384,
  },
];

/**
 * All claw402 models using OpenAI-compatible API.
 * (Anthropic models use a separate provider entry.)
 */
export const CLAW402_ALL_OPENAI_COMPAT_MODELS: ModelDefinitionConfig[] = [
  ...CLAW402_OPENAI_MODELS,
  ...CLAW402_DEEPSEEK_MODELS,
  ...CLAW402_QWEN_MODELS,
  ...CLAW402_GEMINI_MODELS,
  ...CLAW402_GROK_MODELS,
  ...CLAW402_KIMI_MODELS,
];
