import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Contato } from '../types/contato';
import type { History } from '../types/history';

export const contatosApi = createApi({
  reducerPath: 'contatosApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  endpoints: (builder) => ({
    getContatos: builder.query<Contato[], void>({
      query: () => 'contatos',
    }),
    getHistory: builder.query<History[], void>({
      query: () => 'history'
    })
  })
});

export const { useGetContatosQuery, useGetHistoryQuery } = contatosApi;
