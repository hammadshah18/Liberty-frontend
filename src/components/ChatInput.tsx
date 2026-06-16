"use client";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export default function ChatInput({ value, onChange, onSend, disabled }: ChatInputProps) {
  return (
    <form
      className="border-t border-[var(--border)] bg-[rgba(255,255,255,0.96)] px-3 py-3"
      onSubmit={(event) => {
        event.preventDefault();
        onSend();
      }}
    >
      <div className="flex items-end gap-2">
        <label className="sr-only" htmlFor="liberty-chat-input">
          Message
        </label>
        <textarea
          id="liberty-chat-input"
          className="min-h-[88px] flex-1 resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[rgba(31,90,166,0.14)] disabled:cursor-not-allowed disabled:bg-slate-100"
          placeholder="Type your message..."
          rows={3}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              onSend();
            }
          }}
          disabled={disabled}
        />
        <button
          className="inline-flex h-12 min-w-20 items-center justify-center rounded-2xl bg-[#0f2747] px-4 text-sm font-semibold text-white transition hover:bg-[#1f5aa6] focus:outline-none focus:ring-2 focus:ring-[#1f5aa6] focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300"
          type="submit"
          disabled={disabled}
        >
          Send
        </button>
      </div>
      <p className="mt-2 text-xs text-slate-500">Enter to send · Shift+Enter for a new line</p>
    </form>
  );
}
