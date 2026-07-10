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
import { isMockMode } from '../../mocks/mockMode';
import { createMockBaseQuery, type RtkMockRoute } from '../../mocks/rtkMockBaseQuery';
import * as mock from '../../mocks/readingPlanMockData';

const readingPlanMockRoutes: RtkMockRoute[] = [
  {
    test: (segments, method) => segments[0] === 'reading-plans' && segments[1] === 'templates' && method === 'GET',
    handler: () => ({ results: mock.getTemplates() }),
  },
  {
    test: (segments, method) => segments[0] === 'reading-plans' && segments[1] === 'my-plans' && method === 'GET',
    handler: () => mock.getMyPlans(),
  },
  {
    test: (segments, method) => segments[0] === 'reading-plans' && segments.length === 3 && segments[2] === 'today' && method === 'GET',
    handler: ({ segments }) => mock.getTodayReading(segments[1]),
  },
  {
    test: (segments, method) => segments[0] === 'reading-plans' && segments.length === 3 && segments[2] === 'history' && method === 'GET',
    handler: ({ segments, params }) => mock.getReadingHistory(segments[1], params.month),
  },
  {
    test: (segments, method) => segments[0] === 'reading-plans' && segments.length === 3 && segments[2] === 'stats' && method === 'GET',
    handler: ({ segments }) => mock.getReadingStats(segments[1]),
  },
  {
    test: (segments, method) => segments[0] === 'reading-plans' && segments[1] === 'create_plan' && method === 'POST',
    handler: ({ body }) => mock.createPlan(body),
  },
  {
    test: (segments, method) => segments[0] === 'reading-days' && segments.length === 2 && method === 'PATCH',
    handler: ({ segments, body }) => mock.updateReadingStatus({ reading_day_id: segments[1], ...body }),
  },
  {
    test: (segments, method) => segments[0] === 'reading-plans' && segments.length === 2 && method === 'DELETE',
    handler: ({ segments }) => {
      mock.deletePlan(segments[1]);
      return null;
    },
  },
  {
    test: (segments, method) => segments[0] === 'reading-plans' && segments.length === 2 && method === 'GET',
    handler: ({ segments }) => mock.getPlanById(segments[1]),
  },
];

export const readingPlanApi = createApi({
  reducerPath: 'readingPlanApi',
  baseQuery: isMockMode
    ? createMockBaseQuery(readingPlanMockRoutes)
    : fetchBaseQuery({
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
    getPlanTemplates: builder.query<PlanTemplateResponse, void>({
      query: () => '/reading-plans/templates/',
    }),

    getMyPlans: builder.query<ReadingPlan[], void>({
      query: () => '/reading-plans/my-plans/',
      providesTags: ['ReadingPlans'],
    }),

    getPlan: builder.query<ReadingPlan, string>({
      query: (id) => `/reading-plans/${id}/`,
      providesTags: ['ReadingPlans'],
    }),

    createPlan: builder.mutation<ReadingPlan, CreatePlanPayload>({
      query: (payload) => ({
        url: '/reading-plans/create_plan/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['ReadingPlans'],
    }),

    getTodayReading: builder.query<ReadingDay, string>({
      query: (planId) => `/reading-plans/${planId}/today/`,
      providesTags: ['ReadingDays'],
    }),

    updateReadingStatus: builder.mutation<ReadingDay, UpdateReadingPayload>({
      query: ({ reading_day_id, ...payload }) => ({
        url: `/reading-days/${reading_day_id}/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['ReadingDays', 'ReadingPlans', 'Stats'],
    }),

    // ✅ CORRIGIDO: Força refetch e não usa cache antigo
    getReadingHistory: builder.query<ReadingDay[], { planId: string; month?: string }>({
      query: ({ planId, month }) => {
        const params = new URLSearchParams();
        if (month) params.append('month', month);
        
        console.log('🔍 Buscando histórico:', { planId, month, url: `/reading-plans/${planId}/history/?${params}` });
        
        return {
          url: `/reading-plans/${planId}/history/`,
          params: month ? { month } : undefined,
        };
      },
      providesTags: (result, error, { planId, month }) => [
        { type: 'ReadingDays', id: `${planId}-${month || 'all'}` }
      ],
      // ✅ IMPORTANTE: Força refetch sempre que os parâmetros mudarem
      keepUnusedDataFor: 0,
    }),

    getReadingStats: builder.query<ReadingStats, string>({
      query: (planId) => `/reading-plans/${planId}/stats/`,
      providesTags: ['Stats'],
    }),

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