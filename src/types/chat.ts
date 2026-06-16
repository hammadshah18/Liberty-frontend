export type ChatRole = "assistant" | "user";

export type ChatTone = "default" | "error";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  tone?: ChatTone;
}

export interface ChatResponse {
  answer: string;
}
