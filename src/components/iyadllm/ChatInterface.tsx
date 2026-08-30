'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import RateLimitIndicator from './RateLimitIndicator';

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
  const [rateLimit, setRateLimit] = useState<{ limit: number; remaining: number; resetTime: number } | null>(null);
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
          setRateLimit({
            limit: parseInt(response.headers.get('X-RateLimit-Limit') || '15', 10),
            remaining: 0,
            resetTime: parseInt(response.headers.get('X-RateLimit-Reset') || '0', 10),
          });
          setError('Rate limit exceeded. Try again later.');
        } else {
          setError(errorData.error || 'Something went wrong');
        }
        onOrbStateChange?.('idle');
        setIsLoading(false);
        return;
      }

      const rateLimitInfo = {
        limit: parseInt(response.headers.get('X-RateLimit-Limit') || '15', 10),
        remaining: parseInt(response.headers.get('X-RateLimit-Remaining') || '0', 10),
        resetTime: parseInt(response.headers.get('X-RateLimit-Reset') || '0', 10),
      };
      setRateLimit(rateLimitInfo);

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
          <div className="text-center text-muted py-10">
            <p className="text-sm">sup. ask me anything about Iyad — projects, design, code, career, whatever.</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div className="px-4 py-2 text-xs text-red-400 text-center" role="alert">
          {error}
          <button onClick={() => setError(null)} className="ml-2 text-red-400 hover:text-red-300 underline">
            Dismiss
          </button>
        </div>
      )}

      <RateLimitIndicator rateLimit={rateLimit} />

      <ChatInput
        onSend={sendMessage}
        disabled={isLoading}
        onCancel={isLoading ? handleCancel : undefined}
        isLoading={isLoading}
      />
    </div>
  );
}