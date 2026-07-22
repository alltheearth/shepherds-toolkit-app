import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AxiosError } from 'axios';
import type { AppDispatch, RootState } from '../../store';
import { askAI } from '../../services/aiService';
import type { AIQuotaExceededError } from '../../types/ai.types';
import {
  addMessage,
  startSending,
  messageSucceeded,
  messageFailed,
  setQuotaError,
  type CalebContext,
} from './index';

export function useCalebChat() {
  const dispatch = useDispatch<AppDispatch>();
  const context = useSelector((state: RootState) => state.caleb.context);

  const send = useCallback(
    async (text: string, overrideContext?: CalebContext) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      const ctx = overrideContext ?? context;
      const query = ctx?.promptPrefix ? `${ctx.promptPrefix}\n\n${trimmed}` : trimmed;
      const pendingId = crypto.randomUUID();

      dispatch(
        addMessage({
          id: pendingId,
          role: 'user',
          content: trimmed,
          createdAt: new Date().toISOString(),
          pending: true,
        })
      );
      dispatch(startSending());

      try {
        const res = await askAI({
          interaction_type: ctx?.interactionType ?? 'application',
          query,
          verse_id: ctx?.kind === 'verse' ? Number(ctx.id) : undefined,
        });
        dispatch(messageSucceeded({ pendingId, content: res.response }));
      } catch (err) {
        const axiosErr = err as AxiosError<AIQuotaExceededError | { detail?: string }>;
        if (axiosErr.response?.status === 429) {
          dispatch(setQuotaError(axiosErr.response.data as AIQuotaExceededError));
          dispatch(messageFailed({ pendingId, error: 'Limite mensal de IA atingido.' }));
        } else {
          dispatch(
            messageFailed({
              pendingId,
              error: 'Não foi possível obter resposta do Caleb. Tente novamente.',
            })
          );
        }
      }
    },
    [dispatch, context]
  );

  return { send, context };
}
