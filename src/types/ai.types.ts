export type AIInteractionType = 'context' | 'etymology' | 'related_texts' | 'application';

export type AIPlan = 'free' | 'pro' | 'unlimited';

export interface AICompletionRequest {
  interaction_type: AIInteractionType;
  query: string;
  verse_id?: number;
}

export interface AICompletionResponse {
  response: string;
  interaction_id: string;
  created_at: string;
  tokens_used: number;
  tokens_remaining: number | null;
}

export interface AIUsage {
  plan: AIPlan;
  monthly_token_limit: number | null;
  tokens_used: number;
  tokens_remaining: number | null;
  period_reset_at: string;
}

export interface AIQuotaExceededError {
  error: string;
  plan: AIPlan;
  monthly_token_limit: number | null;
  tokens_used: number;
  period_reset_at: string;
}
