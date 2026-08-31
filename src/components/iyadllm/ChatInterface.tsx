'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

interface ChatInterfaceProps {
  onOrbStateChange?: (state: 'idle' | 'thinking' | 'responding') => void;
}

export default function ChatInterface({ onOrbStateChange }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    onOrbStateChange?.('thinking');
    setError(null);

    const history = messages.slice(-6).map(m => ({ role: m.role, content: m.content }));

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('/api/iyadllm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content, history }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 429) {
          setError('Rate limit exceeded. Try again later.');
        } else {
          setError(errorData.error || 'Something went wrong');
        }
        onOrbStateChange?.('idle');
        setIsLoading(false);
        return;
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        onOrbStateChange?.('idle');
        setIsLoading(false);
        return;
      }

      let assistantContent = '';
      const assistantMessage: Message = { role: 'assistant', content: '', isStreaming: true };
      setMessages(prev => [...prev, assistantMessage]);
      onOrbStateChange?.('responding');

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n').filter(line => line.startsWith('data: '));

          for (const line of lines) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                assistantContent += parsed.content;
                setMessages(prev => {
                  const last = prev[prev.length - 1];
                  if (last && last.role === 'assistant') {
                    return [...prev.slice(0, -1), { ...last, content: assistantContent }];
                  }
                  return prev;
                });
              }
            } catch {
              // Ignore parse errors
            }
          }
        }
      } finally {
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last && last.role === 'assistant') {
            return [...prev.slice(0, -1), { ...last, content: assistantContent, isStreaming: false }];
          }
          return prev;
        });
        onOrbStateChange?.('idle');
        setIsLoading(false);
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      console.error('Chat error:', err);
setError('Failed to send message. Please try again.');
        onOrbStateChange?.('idle');
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    abortControllerRef.current?.abort();
    onOrbStateChange?.('idle');
    setIsLoading(false);
    setMessages(prev => {
      const last = prev[prev.length - 1];
      if (last && last.role === 'assistant' && last.isStreaming) {
        return prev.slice(0, -1);
      }
      return prev;
    });
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-0">
      <div className="flex-1 overflow-y-auto p-4 space-y-3" role="log" aria-live="polite" aria-label="Chat messages">
        {messages.length === 0 && (
          <div className="flex flex-col items-center text-center pt-10 pb-6 px-2">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#e8c87a] mb-3">IyadLLM</p>
            <p className="text-sm text-black/65 leading-relaxed max-w-[22rem]">
              Ask me anything about Iyad &mdash; projects, design, code, career.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-5">
              {['your projects', 'what broke?', 'internship'].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => sendMessage(s)}
                  disabled={isLoading}
                  className="px-3 py-1.5 rounded-full text-xs bg-white/60 ring-1 ring-black/10 text-black/70 hover:bg-white hover:text-black transition-colors disabled:opacity-50"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div className="px-4 py-2 text-xs text-destructive text-center" role="alert">
          {error}
          <button onClick={() => setError(null)} className="ml-2 text-destructive hover:text-destructive/70 underline">
            Dismiss
          </button>
        </div>
      )}

      <ChatInput
        onSend={sendMessage}
        disabled={isLoading}
        onCancel={isLoading ? handleCancel : undefined}
        isLoading={isLoading}
      />
    </div>
  );
}