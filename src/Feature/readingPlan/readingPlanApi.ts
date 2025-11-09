// src/feature/readingPlan/readingPlanApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import authService from '../../services/authService';
import type { 
  ReadingPlan, 
  PlanTemplate, 
  CreatePlanPayload, 
  UpdateReadingPayload,
  ReadingDay,
  ReadingStats,
  PlanTemplateResponse
} from '../../types/readingPlan.types';

export const readingPlanApi = createApi({
  reducerPath: 'readingPlanApi',
  baseQuery: fetchBaseQuery({
    // ✅ IMPORTANTE: baseUrl já tem /api/ se VITE_API_URL = http://localhost:8000/api
    // OU não tem /api/ se VITE_API_URL = http://localhost:8000
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = authService.getToken();
      if (token) {
        headers.set('Authorization', `Token ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['ReadingPlans', 'ReadingDays', 'Stats'],
  endpoints: (builder) => ({
    // ✅ Listar templates disponíveis
    getPlanTemplates: builder.query<PlanTemplateResponse, void>({
      query: () => '/reading-plans/templates/',
    }),

    // ✅ Listar planos do usuário  
    getMyPlans: builder.query<ReadingPlan[], void>({
      query: () => '/reading-plans/my-plans/',
      providesTags: ['ReadingPlans'],
    }),

    // ✅ Obter plano específico
    getPlan: builder.query<ReadingPlan, string>({
      query: (id) => `/reading-plans/${id}/`,
      providesTags: ['ReadingPlans'],
    }),

    // ✅ Criar novo plano
    createPlan: builder.mutation<ReadingPlan, CreatePlanPayload>({
      query: (payload) => ({
        url: '/reading-plans/create_plan/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['ReadingPlans'],
    }),

    // ✅ Obter leitura do dia
    getTodayReading: builder.query<ReadingDay, string>({
      query: (planId) => `/reading-plans/${planId}/today/`,
      providesTags: ['ReadingDays'],
    }),

    // ✅ Marcar leitura como completa/pendente
    updateReadingStatus: builder.mutation<ReadingDay, UpdateReadingPayload>({
      query: ({ reading_day_id, ...payload }) => ({
        url: `/reading-days/${reading_day_id}/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['ReadingDays', 'ReadingPlans', 'Stats'],
    }),

    // ✅ Obter histórico de leituras
    getReadingHistory: builder.query<ReadingDay[], { planId: string; month?: string }>({
      query: ({ planId, month }) => ({
        url: `/reading-plans/${planId}/history/`,
        params: month ? { month } : undefined,
      }),
      providesTags: ['ReadingDays'],
    }),

    // ✅ Obter estatísticas
    getReadingStats: builder.query<ReadingStats, string>({
      query: (planId) => `/reading-plans/${planId}/stats/`,
      providesTags: ['Stats'],
    }),

    // ✅ Deletar plano
    deletePlan: builder.mutation<void, string>({
      query: (id) => ({
        url: `/reading-plans/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ReadingPlans'],
    }),
  }),
});

export const {
  useGetPlanTemplatesQuery,
  useGetMyPlansQuery,
  useGetPlanQuery,
  useCreatePlanMutation,
  useGetTodayReadingQuery,
  useUpdateReadingStatusMutation,
  useGetReadingHistoryQuery,
  useGetReadingStatsQuery,
  useDeletePlanMutation,
} = readingPlanApi;

export default readingPlanApi;