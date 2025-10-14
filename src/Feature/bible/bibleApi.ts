import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import authService from '../../services/authService';
import type { BibleVerse } from '../../types/bible.types';

export interface VerseResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: BibleVerse[];
}

// Parâmetros da query
export interface VerseQueryParams {
  book: string;
  chapter: string;
  version: string;
  page?: number;
}

// Configuração correta com prepareHeaders
export const bibleApi = createApi({
  reducerPath: 'bibleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    prepareHeaders: (headers) => {
      const token = authService.getToken();

      if (token) {
        headers.set('Authorization', `Token ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getVerses: builder.query<VerseResponse, VerseQueryParams>({
      query: ({ book, chapter, version, page = 1 }) =>
        `/bible/verses/?book=${book}&chapter=${chapter}&version=${version}&page=${page}`,
    }),
  }),
});

export const { useGetVersesQuery } = bibleApi;
export default bibleApi;