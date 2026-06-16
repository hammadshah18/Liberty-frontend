"use client";

import { useEffect, useMemo, useRef } from "react";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import type { ChatMessage } from "../types/chat";

interface ChatWindowProps {
  isOpen: boolean;
  messages: ChatMessage[];
  inputValue: string;
  isLoading: boolean;
  onClose: () => void;
  onChangeInput: (value: string) => void;
  onSendMessage: () => void;
  onSuggestionClick: (message: string) => void;
}

const suggestedQuestions = [
  "What products do you offer?",
  "Tell me about sustainability.",
  "What certifications do you have?",
  "How can I contact Liberty?"
];

export default function ChatWindow({
  isOpen,
  messages,
  inputValue,
  isLoading,
  onClose,
  onChangeInput,
  onSendMessage,
  onSuggestionClick
}: ChatWindowProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const showSuggestions = useMemo(() => messages.length <= 1, [messages.length]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    scroller.scrollTop = scroller.scrollHeight;
  }, [isLoading, isOpen, messages]);

  if (!isOpen) {
    return null;
  }

  return (
    <section
      aria-label="Liberty Assistant chat window"
      className="fixed bottom-3 left-3 right-3 z-50 overflow-hidden rounded-[28px] border border-white/70 bg-[var(--surface)] shadow-widget backdrop-blur-xl sm:bottom-6 sm:left-auto sm:right-6 sm:top-auto sm:h-[600px] sm:w-[380px]"
      role="dialog"
      aria-modal="false"
    >
      <div className="flex h-[calc(100vh-1.5rem)] flex-col sm:h-full">
        <header className="border-b border-[var(--border)] bg-gradient-to-r from-[#0f2747] via-[#1f5aa6] to-[#0f766e] px-4 py-4 text-white">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">Liberty Assistant</p>
              <h2 className="mt-1 text-lg font-semibold">Liberty Assistant</h2>
              <p className="mt-1 text-sm text-white/80">Powered by Liberty Mills</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/80"
              aria-label="Close chat"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </header>

        <div ref={scrollerRef} className="scrollbar-thin flex-1 space-y-4 overflow-y-auto px-4 py-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {showSuggestions ? (
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-3 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Suggested questions</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-left text-sm text-slate-700 transition hover:border-[var(--primary)] hover:bg-[rgba(31,90,166,0.08)] hover:text-[var(--primary-strong)] focus:outline-none focus:ring-2 focus:ring-[rgba(31,90,166,0.16)]"
                    onClick={() => onSuggestionClick(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {isLoading ? (
            <div className="flex justify-start" aria-live="polite">
              <div className="rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
                <span className="inline-flex items-center gap-2">
                  <span>Liberty Assistant is typing...</span>
                  <span className="flex gap-1" aria-hidden="true">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--primary)] [animation-delay:-0.2s]" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--primary)] [animation-delay:-0.1s]" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--primary)]" />
                  </span>
                </span>
              </div>
            </div>
          ) : null}
        </div>

        <ChatInput value={inputValue} onChange={onChangeInput} onSend={onSendMessage} disabled={isLoading} />
      </div>
    </section>
  );
}
