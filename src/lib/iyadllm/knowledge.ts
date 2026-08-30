import fs from 'fs';
import path from 'path';
import { KnowledgeChunk, SearchResult } from './types';

const KNOWLEDGE_DIR = path.join(process.cwd(), 'src/content/iyad-knowledge');

let knowledgeCache: KnowledgeChunk[] | null = null;

function loadAllKnowledge(): KnowledgeChunk[] {
  if (knowledgeCache) return knowledgeCache;

  const chunks: KnowledgeChunk[] = [];

  if (!fs.existsSync(KNOWLEDGE_DIR)) {
    console.warn(`Knowledge directory not found: ${KNOWLEDGE_DIR}`);
    return chunks;
  }

  const files = fs.readdirSync(KNOWLEDGE_DIR).filter(f => f.endsWith('.md'));

  for (const file of files) {
    const filePath = path.join(KNOWLEDGE_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const category = file.replace('.md', '');

    const sections = content.split(/^## /m);
    for (const section of sections) {
      if (!section.trim()) continue;
      const lines = section.trim().split('\n');
      const heading = lines[0].trim();
      const body = lines.slice(1).join('\n').trim();
      if (body) {
        chunks.push({
          category,
          heading,
          content: body,
        });
      }
    }
  }

  knowledgeCache = chunks;
  return chunks;
}

const COMMON_SHORT_WORDS = new Set([
  'who', 'what', 'when', 'where', 'why', 'how',
  'from', 'to', 'for', 'with', 'about', 'into', 'over',
  'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'do', 'does', 'did', 'have', 'has', 'had',
  'can', 'could', 'will', 'would', 'should', 'shall',
  'may', 'might', 'must', 'need',
  'hi', 'hello', 'hey', 'yo', 'sup',
  'iyad', 'yat', 'me', 'my', 'i', 'you', 'your',
]);

function simpleTokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2 || COMMON_SHORT_WORDS.has(t));
}

function calculateScore(queryTokens: string[], chunk: KnowledgeChunk): number {
  const headingLower = chunk.heading.toLowerCase();
  const contentLower = chunk.content.toLowerCase();
  const categoryLower = chunk.category.toLowerCase();

  let score = 0;

  for (const qt of queryTokens) {
    // Exact token matches in heading (highest weight)
    if (headingLower.includes(qt)) score += 5;
    
    // Exact token matches in category
    if (categoryLower.includes(qt)) score += 3;
    
    // Substring matches in content
    const contentMatches = (contentLower.match(new RegExp(qt, 'g')) || []).length;
    score += contentMatches;
    
    // Boost for question words matching headings that are questions
    if (COMMON_SHORT_WORDS.has(qt) && headingLower.endsWith('?')) {
      score += 2;
    }
  }

  // Bonus for multiple query tokens matching
  const uniqueMatches = queryTokens.filter(qt => 
    headingLower.includes(qt) || contentLower.includes(qt)
  ).length;
  if (uniqueMatches > 1) score += uniqueMatches * 2;

  return score;
}

export function searchKnowledge(query: string, topK = 5): SearchResult {
  const chunks = loadAllKnowledge();
  const queryTokens = simpleTokenize(query);

  // Debug logging
  console.log('[IyadLLM Search] Query:', query);
  console.log('[IyadLLM Search] Tokens:', queryTokens);

  if (queryTokens.length === 0) {
    return { chunks: [], query };
  }

  const scored = chunks
    .map(chunk => ({ chunk, score: calculateScore(queryTokens, chunk) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  console.log('[IyadLLM Search] Top results:', scored.map(s => `[${s.chunk.category}] ${s.chunk.heading} (${s.score})`));

  return {
    chunks: scored.map(({ chunk, score }) => ({ ...chunk, score })),
    query,
  };
}

export function getAllKnowledge(): KnowledgeChunk[] {
  return loadAllKnowledge();
}

export function clearKnowledgeCache(): void {
  knowledgeCache = null;
}