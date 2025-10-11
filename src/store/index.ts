import { configureStore } from "@reduxjs/toolkit";
import ModuleActiveSlice from "../Feature/ModuleActiveSlice";
import { bibleApi } from "../feature/bible/bibleApi";

const store = configureStore({
    reducer: {
        moduleActive: ModuleActiveSlice,
        [bibleApi.reducerPath]: bibleApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bibleApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;