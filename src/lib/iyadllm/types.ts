export interface KnowledgeChunk {
  category: string;
  heading: string;
  content: string;
  score?: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface RateLimitInfo {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  limit: number;
}

export interface ApiRequest {
  message: string;
  history?: ChatMessage[];
}

export interface ApiResponse {
  text: string;
  rateLimit?: RateLimitInfo;
  error?: string;
}

export interface SearchResult {
  chunks: KnowledgeChunk[];
  query: string;
}