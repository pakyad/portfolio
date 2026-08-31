import { Groq } from 'groq-sdk';
import { searchKnowledge } from './knowledge';
import { ChatMessage, KnowledgeChunk } from './types';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

const SYSTEM_PROMPT = `You are IyadLLM, a conversational version of Iyad's portfolio.

You're Iyad (Muhammad Iyad Iman Mohmad Nazri, goes by "yat"), a Software Engineering student at UniKL in Penang, Malaysia. You're looking for an internship Oct 2026–Feb 2027. You've built four real things: ALDER ROASTERS (coffee commerce), CODEP-PULSE (campus marketplace with AI pricing), LaterLah (deterministic save-for-later), and Rosta (team scheduling with multi-tenant RLS). That's it. The rest are experiments that didn't ship.

Talk like a real person, not an AI assistant. First person, conversational, honest.

Voice & vibe:
- Mature, relaxed, casual, smart. Owns mistakes. Admits uncertainty. Doesn't perform expertise.
- Contractions, sentence fragments, natural pauses ("hmm", "wait", "ok", "let me think")
- "yeah", "nah", "kinda", "tbh", "idk" — when natural
- Match the user's energy: brief if they're brief, detailed if they go deep
- Comfortable saying "I don't know that one," "that's not in my notes," "still figuring that out"
- Opinionated without arrogance. "Best practice" isn't an argument — explain the tradeoff
- Can joke when it fits, don't force it
- Never say "As an AI" or "I don't have access," just "I don't know that one" or "that's not in my notes"
- If you're wrong, own it. "my bad, that was wrong" > pretending
- NEVER use em dashes. Use commas, periods, or line breaks instead.

When answering:
- Use the knowledge chunks as your source of truth. If they have the answer, USE THEM.
- Be specific, reference actual projects, decisions, tradeoffs, what broke
- Don't sound like a LinkedIn bio, corporate bio, or AI assistant
- It's okay to say "still learning" or "still figuring that out"
- Short answers are fine. Don't pad.

If asked about project internals not in knowledge: "That's not documented in my notes. The gist is [one sentence from knowledge]. Happy to email details if you want the full story."

If asked about Princess/blu/coastline/bazram: call them experiments that didn't ship. Don't present as portfolio pieces.

If asked about hidden/unpublished projects: acknowledge they exist but don't reveal specifics unless in knowledge. Pivot to: "The ones I've shared publicly are Alder, Pulse, LaterLah, Rosta. The rest are experiments, some abandoned, some just not ready."`;

function buildPrompt(
  userMessage: string,
  knowledgeChunks: KnowledgeChunk[],
  history: ChatMessage[] = []
): string {
  let prompt = SYSTEM_PROMPT + '\n\n';

  if (knowledgeChunks.length > 0) {
    prompt += '=== RELEVANT KNOWLEDGE ===\n';
    for (const chunk of knowledgeChunks) {
      prompt += `[${chunk.category}] ${chunk.heading}\n${chunk.content}\n\n`;
    }
    prompt += '=== END KNOWLEDGE ===\n\n';
  }

  if (history.length > 0) {
    prompt += '=== CONVERSATION HISTORY ===\n';
    for (const msg of history.slice(-6)) {
      prompt += `${msg.role === 'user' ? 'User' : 'Iyad'}: ${msg.content}\n`;
    }
    prompt += '=== END HISTORY ===\n\n';
  }

  prompt += `User: ${userMessage}\n\nIyad:`;

  return prompt;
}

function fallbackResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();

  if (lower.includes('hidden') || lower.includes('unpublished') || lower.includes('secret') || lower.includes('other project')) {
    return "There are a few experiments and private projects not in the public portfolio, some personal, some unfinished, some just not ready to share yet. The ones I've shared publicly are Alder Roasters, CODEP-PULSE, LaterLah, Rosta, and a few smaller experiments. If you're curious about something specific, feel free to email me at iyadmohmadnazri@gmail.com.";
  }

  return "That's a good question, but I don't have that documented in my knowledge base. I'm still learning and there's plenty I haven't written down yet. If you want the real answer, email me at iyadmohmadnazri@gmail.com, I'm happy to chat.";
}

const MODEL = 'openai/gpt-oss-20b';

// Hard output filter. The prompt forbids em dashes, but the model still emits
// them, so we strip/replace them here regardless of model behaviour so they
// can never reach the UI.
export function sanitize(text: string): string {
  return text
    .replace(/[\u2014\u2013]/g, (m) => (m === '\u2013' ? '-' : ','))
    .replace(/--+/g, ',')
    .replace(/[ \t]+,/g, ',')
    .replace(/,[ \t]+,/g, ',')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/[ \t]+([.,!?;:])/g, '$1')
    .replace(/^\s+|\s+$/g, '')
    .replace(/\n{3,}/g, '\n\n');
}

export async function generateResponse(
  userMessage: string,
  history: ChatMessage[] = []
): Promise<string> {
  const { chunks } = searchKnowledge(userMessage, 5);
  
  console.log('[IyadLLM] Query:', userMessage);
  console.log('[IyadLLM] Chunks found:', chunks.length);
  chunks.forEach((c, i) => console.log(`[IyadLLM] Chunk ${i}: [${c.category}] ${c.heading} (score: ${c.score})`));

  const prompt = buildPrompt(userMessage, chunks, history);

  try {
    const completion = await groq.chat.completions.create({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: parseInt(process.env.IYADLLM_MAX_TOKENS || '400', 10),
      stream: false,
    });

    return sanitize(completion.choices[0]?.message?.content?.trim() || "I'm not sure how to respond to that.");
  } catch (error) {
    console.error('Groq API error:', error);
    return fallbackResponse(userMessage);
  }
}

export async function generateStreamingResponse(
  userMessage: string,
  history: ChatMessage[] = []
): Promise<ReadableStream> {
  const { chunks } = searchKnowledge(userMessage, 5);
  
  console.log('[IyadLLM] Query:', userMessage);
  console.log('[IyadLLM] Chunks found:', chunks.length);
  chunks.forEach((c, i) => console.log(`[IyadLLM] Chunk ${i}: [${c.category}] ${c.heading} (score: ${c.score})`));

  const prompt = buildPrompt(userMessage, chunks, history);

  try {
    const stream = await groq.chat.completions.create({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: parseInt(process.env.IYADLLM_MAX_TOKENS || '400', 10),
      stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: sanitize(content) })}\n\n`));
          }
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      },
    });

    return readable;
  } catch (error) {
    console.error('Groq streaming error:', error);
    const fallback = sanitize(fallbackResponse(userMessage));
    const encoder = new TextEncoder();
    return new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: fallback })}\n\n`));
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      },
    });
  }
}