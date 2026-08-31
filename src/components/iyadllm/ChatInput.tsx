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
    <form onSubmit={handleSubmit} className="p-3 border-t border-black/5 bg-white/40 backdrop-blur-sm">
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={disabled ? (isLoading ? 'IyadLLM is thinking…' : 'Rate limited — try again later') : 'Ask anything…'}
          className="flex-1 min-h-[28px] max-h-40 px-3.5 py-2 bg-white/60 border border-black/10 rounded-2xl text-sm text-[#1c1c1a] placeholder:text-black/40 resize-none focus:outline-none focus:ring-2 focus:ring-black/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          rows={1}
          aria-label="Your message"
          style={{ height: 'auto', minHeight: '28px', lineHeight: '1.4' }}
        />
        <div className="flex items-center gap-1">
          {isLoading && onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              className="p-2 rounded-full bg-black/10 text-[#1c1c1a] hover:bg-black/20 transition-colors"
              aria-label="Cancel"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <button
              type="submit"
              disabled={disabled || !message.trim()}
              className="p-2.5 rounded-full bg-[#1c1c1a] text-[#f7f5f0] hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
              aria-label="Send message"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between mt-1.5 text-xs text-black/45">
        {showCounter && <span>{message.length}/{500}</span>}
        {isLoading && <span className="text-[#e8c87a] animate-pulse">Streaming…</span>}
      </div>
    </form>
  );
}