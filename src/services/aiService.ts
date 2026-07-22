import api from './api';
import type { AICompletionRequest, AICompletionResponse, AIUsage } from '../types/ai.types';

export const askAI = async (request: AICompletionRequest): Promise<AICompletionResponse> => {
  const response = await api.post<AICompletionResponse>('/ai/complete/', request);
  return response.data;
};

export const getAIUsage = async (): Promise<AIUsage> => {
  const response = await api.get<AIUsage>('/ai/usage/');
  return response.data;
};
