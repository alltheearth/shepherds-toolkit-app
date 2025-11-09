// src/feature/bible/bibleApi.ts - VERSÃO ATUALIZADA COM NAVEGAÇÃO

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import authService from '../../services/authService';
import type { BibleBook, BibleVerse, HighlightColor, ChapterNavigation } from '../../types/bible.types';

export interface BooksResponse { 
    "count": 66,
    "next": null,
    "previous": null,
    "results": BibleBook[]
}

// ✅ ATUALIZADO: Adicionar navegação na resposta
export interface VerseResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: BibleVerse[];
    chapter_navigation?: ChapterNavigation; // ← NOVO
}

export interface VerseQueryParams {
    book: string;
    chapter: string;
    version: string;
    page?: number;
}

export interface HighlightPayload {
    verse: string | number;
    color?: HighlightColor;
    is_favorite?: boolean;
}

export const bibleApi = createApi({
    reducerPath: 'bibleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers) => {
            const token = authService.getToken();
            if (token) {
                headers.set('Authorization', `Token ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getBooks: builder.query<BooksResponse, void>({
            query: () => `/bible/books/`,
        }),
        
        // ✅ ATUALIZADO: Agora retorna navegação
        getVerses: builder.query<VerseResponse, VerseQueryParams>({
            query: ({ book, chapter, version, page = 1 }) =>
                `/bible/verses/?book=${book}&chapter=${chapter}&version=${version}&page=${page}`,
        }),
        
        highlightVerse: builder.mutation<any, HighlightPayload>({
            query: (payload) => ({
                url: `/bible/highlights/`,
                method: 'POST',
                body: payload,
            }),
        }),

        toggleFavorite: builder.mutation<any, HighlightPayload>({
            query: (payload) => ({
                url: `/bible/highlights/`,
                method: 'POST',
                body: payload,
            }),
        }),
    }),
});

export const {
    useGetBooksQuery,
    useGetVersesQuery,
    useHighlightVerseMutation,
    useToggleFavoriteMutation,
} = bibleApi;

export default bibleApi;