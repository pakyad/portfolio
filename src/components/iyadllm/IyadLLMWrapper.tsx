'use client';

import { useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import ChatInterface from './ChatInterface';
import { ThinkingOrb } from 'thinking-orbs';

export default function IyadLLMWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const [orbState, setOrbState] = useState<'idle' | 'thinking' | 'responding'>('idle');

  const orbAnimation = orbState === 'thinking' ? 'searching' : orbState === 'responding' ? 'composing' : 'listening';

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  const headerVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="fixed inset-0 bg-navy/60 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className="fixed right-4 bottom-[104px] z-50 w-[350px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-7.5rem)]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="iyadllm-title"
            tabIndex={-1}
            initial={{
              scale: 0.1,
              opacity: 0,
              borderRadius: 9999,
              width: 40,
              height: 40,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              borderRadius: 12,
              width: 'auto',
              height: 'auto',
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              mass: 1,
            }}
          >
            <motion.div
              className="w-full max-w-xs max-h-[500px] bg-navy-deep/90 backdrop-blur-2xl border border-ink/10 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden"
              layout
            >
              <AnimatePresence mode="wait">
                <motion.div
                  variants={headerVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  className="flex items-center justify-between px-3 py-2 border-b border-ink/10"
                >
                  <motion.div
                    layoutId="orb-header"
                    className="flex items-center gap-2"
                  >
                    <ThinkingOrb
                      state={orbAnimation}
                      size={20}
                      theme="dark"
                      speed={0.8}
                      aria-label="IyadLLM ready"
                    />
                    <motion.h2
                      id="iyadllm-title"
                      className="text-sm font-medium text-ink"
                    >
                      IyadLLM
                    </motion.h2>
                  </motion.div>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-ink/5 transition-colors text-ink/50 hover:text-ink focus:outline-none focus:ring-2 focus:ring-accent"
                    aria-label="Close chat"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.15 }}
                  className="flex-1 overflow-y-auto p-3 space-y-2"
                  role="log"
                  aria-live="polite"
                  aria-label="Chat messages"
                >
                  <ChatInterface onOrbStateChange={setOrbState} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 pr-2 pl-1 rounded-full bg-cream/10 backdrop-blur-xl border border-ink/10 hover:bg-cream/20 hover:border-accent/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-navy"
        aria-label="Ask Iyad"
        aria-expanded={isOpen}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        <motion.span
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="whitespace-nowrap text-xs font-medium text-ink/70"
          style={{
            fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
            letterSpacing: '0.02em',
          }}
        >
          Ask Iyad
        </motion.span>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
        >
          <ThinkingOrb
            state="listening"
            size={64}
            theme="dark"
            speed={0.7}
            aria-label="Ask Iyad"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #e8c87a, #b8965a)',
            boxShadow: '0 0 6px 1px rgba(232, 200, 122, 0.4)',
          }}
          aria-hidden="true"
        />
      </motion.button>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </MotionConfig>
  );
}