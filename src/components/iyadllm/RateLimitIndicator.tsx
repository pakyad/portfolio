'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, Clock } from 'lucide-react';

interface RateLimitInfo {
  limit: number;
  remaining: number;
  resetTime: number;
}

interface RateLimitIndicatorProps {
  rateLimit: RateLimitInfo | null;
}

export default function RateLimitIndicator({ rateLimit }: RateLimitIndicatorProps) {
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(interval);
  }, []);

  if (!rateLimit) return null;

  const isLimited = rateLimit.remaining <= 0;
  const percentage = (rateLimit.remaining / rateLimit.limit) * 100;
  const countdown = isLimited
    ? Math.max(0, Math.ceil((rateLimit.resetTime - now) / 60000))
    : 0;

  return (
    <div className="px-4 pb-2">
      <div className="flex items-center justify-between text-xs text-ink/50 mb-1">
        <span>
          {isLimited ? (
            <>
              <AlertCircle className="w-3 h-3 inline mr-1 text-red-400" />
              Rate limited
            </>
          ) : (
            `Messages remaining: ${rateLimit.remaining}/${rateLimit.limit}`
          )}
        </span>
        {isLimited && countdown > 0 && (
          <span className="flex items-center gap-1 text-red-400">
            <Clock className="w-3 h-3" />
            Reset in {countdown}m
          </span>
        )}
      </div>
      <div className="h-1.5 bg-rule/30 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            isLimited ? 'bg-red-400' : 'bg-accent'
          }`}
          style={{ width: `${Math.max(percentage, isLimited ? 100 : 0)}%` }}
        />
      </div>
    </div>
  );
}