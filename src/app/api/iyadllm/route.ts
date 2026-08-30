import { NextRequest, NextResponse } from 'next/server';
import { generateStreamingResponse } from '@/lib/iyadllm/llm';
import { checkRateLimit, getClientIdentifier } from '@/lib/iyadllm/rate-limiter';
import { ApiRequest } from '@/lib/iyadllm/types';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const identifier = getClientIdentifier(request);
    const rateLimit = await checkRateLimit(identifier);

    const rateLimitHeaders = {
      'X-RateLimit-Limit': rateLimit.limit.toString(),
      'X-RateLimit-Remaining': rateLimit.remaining.toString(),
      'X-RateLimit-Reset': rateLimit.resetTime.toString(),
    };

    if (!rateLimit.allowed) {
      return new NextResponse(
        JSON.stringify({
          error: 'Rate limit exceeded. Please try again later.',
          rateLimit: {
            limit: rateLimit.limit,
            remaining: rateLimit.remaining,
            resetTime: rateLimit.resetTime,
          },
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            ...rateLimitHeaders,
            'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    const body: ApiRequest = await request.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message' },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: 'Message too long (max 500 characters)' },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    const stream = await generateStreamingResponse(message, history);

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        ...rateLimitHeaders,
      },
    });
  } catch (error) {
    console.error('IyadLLM API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}