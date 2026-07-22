import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AIInteractionType, AIQuotaExceededError } from '../../types/ai.types';

export interface CalebContext {
  kind: 'verse' | 'writing';
  id: string | number;
  label: string;
  interactionType: AIInteractionType;
  promptPrefix?: string;
}

export interface CalebMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
  pending?: boolean;
  error?: string;
}

type CalebState = {
  isOpen: boolean;
  context: CalebContext | null;
  messages: CalebMessage[];
  sending: boolean;
  quotaError: AIQuotaExceededError | null;
};

const initialState: CalebState = {
  isOpen: false,
  context: null,
  messages: [],
  sending: false,
  quotaError: null,
};

const CalebSlice = createSlice({
  name: 'caleb',
  initialState,
  reducers: {
    openCaleb: (state, action: PayloadAction<CalebContext | undefined>) => {
      state.isOpen = true;
      if (action.payload) {
        state.context = action.payload;
      }
      state.quotaError = null;
    },
    closeCaleb: (state) => {
      state.isOpen = false;
    },
    addMessage: (state, action: PayloadAction<CalebMessage>) => {
      state.messages.push(action.payload);
    },
    startSending: (state) => {
      state.sending = true;
      state.quotaError = null;
    },
    messageSucceeded: (state, action: PayloadAction<{ pendingId: string; content: string }>) => {
      state.sending = false;
      const pending = state.messages.find((m) => m.id === action.payload.pendingId);
      if (pending) {
        pending.pending = false;
      }
      state.messages.push({
        id: crypto.randomUUID(),
        role: 'assistant',
        content: action.payload.content,
        createdAt: new Date().toISOString(),
      });
    },
    messageFailed: (state, action: PayloadAction<{ pendingId: string; error: string }>) => {
      state.sending = false;
      const pending = state.messages.find((m) => m.id === action.payload.pendingId);
      if (pending) {
        pending.pending = false;
        pending.error = action.payload.error;
      }
    },
    setQuotaError: (state, action: PayloadAction<AIQuotaExceededError | null>) => {
      state.sending = false;
      state.quotaError = action.payload;
    },
    clearConversation: (state) => {
      state.messages = [];
      state.quotaError = null;
    },
  },
});

export const {
  openCaleb,
  closeCaleb,
  addMessage,
  startSending,
  messageSucceeded,
  messageFailed,
  setQuotaError,
  clearConversation,
} = CalebSlice.actions;

export default CalebSlice.reducer;
