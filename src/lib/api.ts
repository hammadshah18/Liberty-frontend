import type { ChatResponse } from "../types/chat";

const DEFAULT_API_URL = "https://liberty-project-production.up.railway.app";
const REQUEST_TIMEOUT_MS = 20000;

export const LIBERTY_ERROR_MESSAGE =
  "Unable to connect to Liberty Assistant. Please try again later.";

function getApiUrl() {
  return (process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL).replace(/\/+$/, "");
}

async function fetchWithTimeout(input: RequestInfo | URL, init?: RequestInit) {
  const controller = new AbortController();
  const timeoutId = globalThis.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {})
      }
    });
  } finally {
    globalThis.clearTimeout(timeoutId);
  }
}

export async function sendChatMessage(message: string): Promise<string> {
  const trimmedMessage = message.trim();

  if (!trimmedMessage) {
    throw new Error(LIBERTY_ERROR_MESSAGE);
  }

  try {
    const response = await fetchWithTimeout(`${getApiUrl()}/chat`, {
      method: "POST",
      body: JSON.stringify({ message: trimmedMessage })
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = (await response.json()) as Partial<ChatResponse>;

    if (typeof data.answer !== "string" || !data.answer.trim()) {
      throw new Error("Invalid response payload");
    }

    return data.answer.trim();
  } catch {
    throw new Error(LIBERTY_ERROR_MESSAGE);
  }
}
