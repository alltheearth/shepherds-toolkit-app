import { configureStore } from '@reduxjs/toolkit';
import { contatosApi } from '../services/contatosApi';

export const store = configureStore({
  reducer: {
    [contatosApi.reducerPath]: contatosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contatosApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
