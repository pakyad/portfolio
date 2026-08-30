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
      initial={{ opacity: 0, x: isUser ? 20 : -20, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30, delay: 0.05 }}
      className={`flex gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end`}
      role={isUser ? 'none' : 'status'}
      aria-live={isUser ? 'off' : 'polite'}
    >
      {!isUser && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 25 }}
          className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0"
        >
          <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, x: isUser ? 20 : -20, scale: 0.97 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30, delay: 0.05 }}
        className={`max-w-[90%] ${isUser ? 'text-right' : 'text-left'}`}
      >
        <div
          className={`relative inline-block px-3.5 py-2 rounded-2xl ${
            isUser
              ? 'bg-navy text-cream'
              : 'bg-ink/15 text-ink'
          }`}
          style={{
            boxShadow: '0 1px 2px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.03)',
          }}
        >
          <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content || '\u200b'}</p>
          {message.isStreaming && (
            <span className="ml-1 text-accent animate-pulse" style={{ fontWeight: 300 }}>█</span>
          )}
        </div>
      </motion.div>
      {isUser && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 25 }}
          className="w-7 h-7 rounded-full bg-navy/50 flex items-center justify-center flex-shrink-0"
        >
          <svg className="w-4 h-4 text-ink/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
}