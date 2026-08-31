'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatInterface from './ChatInterface';
import { ThinkingOrb } from 'thinking-orbs';

export default function IyadLLMWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const [orbState, setOrbState] = useState<'idle' | 'thinking' | 'responding'>('idle');
  const morphRef = useRef<HTMLDivElement>(null);

  const orbAnimation = orbState === 'thinking' ? 'searching' : orbState === 'responding' ? 'composing' : 'listening';

  const toggle = () => setIsOpen(prev => !prev);

  const handleBackdropClick = () => setIsOpen(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false);
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <div
      ref={morphRef}
      className="iyadllm-morph"
      data-open={isOpen}
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop */}
      <motion.div
        className="iyadllm-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Trigger Orb — fixed, always present */}
      <motion.button
        className="iyadllm-orb-trigger"
        onClick={toggle}
        aria-label="Ask Iyad"
        aria-expanded={isOpen}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        <ThinkingOrb
          state={orbAnimation}
          size={64}
          theme="dark"
          speed={0.7}
          aria-label="Ask Iyad"
        />
      </motion.button>

      {/* Label — shows on hover when closed */}
      <span className="iyadllm-label">Ask Iyad</span>

      {/* Panel — expands from orb position */}
      <div className="iyadllm-panel" role="dialog" aria-modal="true" aria-labelledby="iyadllm-title">
        {/* Header */}
        <div className="iyadllm-panel-header">
          <div className="iyadllm-panel-title">
            <ThinkingOrb
              state={orbAnimation}
              size={20}
              theme="dark"
              speed={0.8}
              aria-label="IyadLLM ready"
            />
            <motion.h2
              id="iyadllm-title"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', stiffness: 400, damping: 35, delay: 0.1 }}
              className="text-sm font-medium text-foreground"
            >
              IyadLLM
            </motion.h2>
          </div>
          <motion.button
            className="iyadllm-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            className="iyadllm-panel-content"
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.15 }}
          >
            <ChatInterface onOrbStateChange={setOrbState} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}