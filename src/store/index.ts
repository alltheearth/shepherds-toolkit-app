import { configureStore } from "@reduxjs/toolkit";

import setShowProfileSlice from "../feature/ShowProfile";
import bibleApi from "../feature/bible/bibleApi";
import ModuleActiveSlice from "../Feature/ModuleActiveSlice"


const store = configureStore({
    reducer: {
        moduleActive: ModuleActiveSlice,
        showProfile: setShowProfileSlice,
        [bibleApi.reducerPath]: bibleApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bibleApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;