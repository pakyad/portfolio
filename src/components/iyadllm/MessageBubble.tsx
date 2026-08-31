'use client';

import { motion } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
      role={isUser ? 'none' : 'status'}
      aria-live={isUser ? 'off' : 'polite'}
    >
      <div
        className={[
          'max-w-[85%] min-w-0 rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words',
          isUser
            ? 'bg-[#1c1c1a] text-[#f7f5f0] rounded-br-md'
            : 'bg-white/95 text-[#1c1c1a] shadow-[0_2px_10px_rgba(0,0,0,0.12)] ring-1 ring-black/5 rounded-bl-md border-l-2 border-l-[#e8c87a]',
        ].join(' ')}
      >
        {message.content || '\u200b'}
        {message.isStreaming && (
          <span className="inline-block ml-1 align-middle animate-pulse" aria-hidden="true">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#e8c87a]" />
          </span>
        )}
      </div>
    </motion.div>
  );
}
