import { configureStore } from "@reduxjs/toolkit";
import setShowProfileSlice from "../feature/ShowProfile";
import bibleApi from "../feature/bible/bibleApi";
import readingPlanApi from "../feature/readingPlan/readingPlanApi";
import ModuleActiveSlice from "../feature/ModuleActiveSlice";
import calebReducer from "../feature/caleb";

const store = configureStore({
    reducer: {
        moduleActive: ModuleActiveSlice,
        showProfile: setShowProfileSlice,
        caleb: calebReducer,
        [bibleApi.reducerPath]: bibleApi.reducer,
        [readingPlanApi.reducerPath]: readingPlanApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(bibleApi.middleware)
            .concat(readingPlanApi.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;