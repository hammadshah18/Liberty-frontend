// "use client";

// import { useEffect, useMemo, useState } from "react";
// import ChatWindow from "./ChatWindow";
// import { LIBERTY_ERROR_MESSAGE, sendChatMessage } from "../lib/api";
// import type { ChatMessage } from "../types/chat";

// const welcomeMessage =
//   "Hello 👋\n\nWelcome to Liberty Assistant.\n\nAsk me about:\n\n• Products\n• Sustainability\n• Certifications\n• Manufacturing\n• Company Information";

// function createMessage(role: ChatMessage["role"], content: string, tone?: ChatMessage["tone"]): ChatMessage {
//   return {
//     id: crypto.randomUUID(),
//     role,
//     content,
//     tone
//   };
// }

// export default function ChatWidget() {
//   const initialMessages = useMemo(() => [createMessage("assistant", welcomeMessage)], []);
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
//   const [inputValue, setInputValue] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     setMessages(initialMessages);
//   }, [initialMessages]);

//   const sendMessage = async (rawMessage: string) => {
//     const trimmedMessage = rawMessage.trim();

//     if (!trimmedMessage || isLoading) {
//       return;
//     }

//     setIsOpen(true);
//     setIsLoading(true);
//     setInputValue("");

//     const userMessage = createMessage("user", trimmedMessage);
//     setMessages((current) => [...current, userMessage]);

//     try {
//       const answer = await sendChatMessage(trimmedMessage);
//       const assistantMessage = createMessage("assistant", answer);
//       setMessages((current) => [...current, assistantMessage]);
//     } catch {
//       const errorMessage = createMessage("assistant", LIBERTY_ERROR_MESSAGE, "error");
//       setMessages((current) => [...current, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <button
//         type="button"
//         onClick={() => setIsOpen((current) => !current)}
//         className="fixed bottom-3 right-3 z-50 inline-flex items-center gap-3 rounded-full border border-white/70 bg-[rgba(255,255,255,0.96)] px-4 py-3 text-sm font-semibold text-[var(--primary-strong)] shadow-widget backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[rgba(31,90,166,0.3)] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[rgba(31,90,166,0.2)] sm:bottom-6 sm:right-6"
//         aria-expanded={isOpen}
//         aria-controls="liberty-assistant-chat"
//       >
//         <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0f2747] text-white">
//           <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.8 8.8 0 0 1-4-.9L3 20l1-4.2A8.5 8.5 0 1 1 21 11.5Z" />
//             <path d="M8 11h8" />
//             <path d="M8 8h5" />
//             <path d="M8 14h6" />
//           </svg>
//         </span>
//         <span className="whitespace-nowrap">Ask Liberty Assistant</span>
//       </button>

//       <div id="liberty-assistant-chat">
//         <ChatWindow
//           isOpen={isOpen}
//           messages={messages}
//           inputValue={inputValue}
//           isLoading={isLoading}
//           onClose={() => setIsOpen(false)}
//           onChangeInput={setInputValue}
//           onSendMessage={() => void sendMessage(inputValue)}
//           onSuggestionClick={(question) => void sendMessage(question)}
//         />
//       </div>
//     </>
//   );
// }









"use client";

import { useEffect, useMemo, useState } from "react";
import ChatWindow from "./ChatWindow";
import { LIBERTY_ERROR_MESSAGE, sendChatMessage } from "../lib/api";
import type { ChatMessage } from "../types/chat";

const welcomeMessage =
  "Hello 👋\n\nWelcome to Liberty Assistant.\n\nAsk me about:\n\n• Products\n• Sustainability\n• Certifications\n• Manufacturing\n• Company Information";

function createMessage(role: ChatMessage["role"], content: string, tone?: ChatMessage["tone"]): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    tone
  };
}

interface ChatWidgetProps {
  /** If true, hides the floating button and shows only the chat UI (for iframe embedding) */
  embedMode?: boolean;
  /** Whether the chat is open (only used in embed mode) */
  isOpen?: boolean;
  /** Callback when close button is clicked (only used in embed mode) */
  onClose?: () => void;
}

export default function ChatWidget({ embedMode = false, isOpen: externalIsOpen, onClose }: ChatWidgetProps) {
  const initialMessages = useMemo(() => [createMessage("assistant", welcomeMessage)], []);
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Use external isOpen if provided (embed mode), otherwise internal state
  const isOpen = embedMode ? (externalIsOpen ?? true) : internalIsOpen;

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const sendMessage = async (rawMessage: string) => {
    const trimmedMessage = rawMessage.trim();

    if (!trimmedMessage || isLoading) {
      return;
    }

    if (!embedMode) {
      setInternalIsOpen(true);
    }
    setIsLoading(true);
    setInputValue("");

    const userMessage = createMessage("user", trimmedMessage);
    setMessages((current) => [...current, userMessage]);

    try {
      const answer = await sendChatMessage(trimmedMessage);
      const assistantMessage = createMessage("assistant", answer);
      setMessages((current) => [...current, assistantMessage]);
    } catch {
      const errorMessage = createMessage("assistant", LIBERTY_ERROR_MESSAGE, "error");
      setMessages((current) => [...current, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (embedMode && onClose) {
      onClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  // ============================================================
  // EMBED MODE: Only render chat UI (no floating button)
  // ============================================================
  if (embedMode) {
    return (
      <ChatWindow
        isOpen={true}
        messages={messages}
        inputValue={inputValue}
        isLoading={isLoading}
        onClose={handleClose}
        onChangeInput={setInputValue}
        onSendMessage={() => void sendMessage(inputValue)}
        onSuggestionClick={(question) => void sendMessage(question)}
      />
    );
  }

  // ============================================================
  // STANDALONE MODE: Floating button + chat window
  // ============================================================
  return (
    <>
      {/* Floating Button */}
      <button
        type="button"
        onClick={() => setInternalIsOpen((current) => !current)}
        className="fixed bottom-3 right-3 z-50 inline-flex items-center gap-3 rounded-full border border-white/70 bg-[rgba(255,255,255,0.96)] px-4 py-3 text-sm font-semibold text-[var(--primary-strong)] shadow-widget backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[rgba(31,90,166,0.3)] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[rgba(31,90,166,0.2)] sm:bottom-6 sm:right-6"
        aria-expanded={internalIsOpen}
        aria-controls="liberty-assistant-chat"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0f2747] text-white">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.8 8.8 0 0 1-4-.9L3 20l1-4.2A8.5 8.5 0 1 1 21 11.5Z" />
            <path d="M8 11h8" />
            <path d="M8 8h5" />
            <path d="M8 14h6" />
          </svg>
        </span>
        <span className="whitespace-nowrap">Ask Liberty Assistant</span>
      </button>

      {/* Chat Window */}
      <div id="liberty-assistant-chat">
        <ChatWindow
          isOpen={internalIsOpen}
          messages={messages}
          inputValue={inputValue}
          isLoading={isLoading}
          onClose={() => setInternalIsOpen(false)}
          onChangeInput={setInputValue}
          onSendMessage={() => void sendMessage(inputValue)}
          onSuggestionClick={(question) => void sendMessage(question)}
        />
      </div>
    </>
  );
}




