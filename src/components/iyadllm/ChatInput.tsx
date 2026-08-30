'use client';

import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function ChatInput({ onSend, disabled, onCancel, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const MAX_LENGTH = 500;

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim() || disabled) return;
    onSend(message.trim());
    setMessage('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!message.trim() || disabled) return;
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_LENGTH) {
      setMessage(e.target.value);
    }
  };

  const showCounter = message.length > 400;

  return (
    <form onSubmit={handleSubmit} className="p-3 border-t border-ink/10 bg-ink/5">
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={disabled ? (isLoading ? 'IyadLLM is thinking…' : 'Rate limited — try again later') : 'Ask anything…'}
          className="flex-1 min-h-[44px] max-h-40 px-3 py-2.5 bg-ink/10 border border-ink/10 rounded-xl text-sm text-ink placeholder:text-muted/60 resize-none focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          rows={1}
          aria-label="Your message"
          style={{ height: 'auto' }}
        />
        <div className="flex items-center gap-1">
          {isLoading && onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              className="p-2 rounded-xl bg-red-400/10 text-red-400 hover:bg-red-400/20 transition-colors"
              aria-label="Cancel"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <button
              type="submit"
              disabled={disabled || !message.trim()}
              className="p-2 rounded-xl bg-accent text-navy hover:bg-accent/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Send message"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between mt-1.5 text-xs text-muted/60">
        {showCounter && <span>{message.length}/{500}</span>}
        {isLoading && <span className="text-accent animate-pulse">Streaming…</span>}
      </div>
    </form>
  );
}