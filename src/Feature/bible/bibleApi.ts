import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tipos do retorno da API
export interface Verse {
  id: number;
  book: number;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
  version: string;
  reference: string;
}

export interface VerseResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Verse[];
}

// Parâmetros da query
export interface VerseQueryParams {
  book: string;
  chapter: string;
  version: string;
  page?: number;
}

export const bibleApi = createApi({
  reducerPath: 'bibleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  }),
  endpoints: (builder) => ({
    getVerses: builder.query<VerseResponse, VerseQueryParams>({
      query: ({ book, chapter, version, page = 1 }) =>
        `/bible/verses/?book=${book}&chapter=${chapter}&version=${version}`,
    }),
  }),
});

export const { useGetVersesQuery } = bibleApi;
