"use client";

import type { ChatMessage } from "../types/chat";

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const isError = message.tone === "error";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm transition-colors ${
          isUser
            ? "rounded-tr-sm bg-[#1f5aa6] text-white"
            : isError
              ? "rounded-tl-sm border border-rose-200 bg-rose-50 text-rose-900"
              : "rounded-tl-sm border border-slate-200 bg-white text-slate-800"
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}
