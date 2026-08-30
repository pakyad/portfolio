import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { RateLimitInfo } from './types';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(
    parseInt(process.env.IYADLLM_RATE_LIMIT || '15', 10),
    '1 h'
  ),
  analytics: true,
  prefix: 'ratelimit:iyadllm',
});

export async function checkRateLimit(identifier: string): Promise<RateLimitInfo> {
  const { success, limit, remaining, reset } = await ratelimit.limit(identifier);

  return {
    allowed: success,
    limit,
    remaining,
    resetTime: reset,
  };
}

export function getClientIdentifier(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  return ip;
}