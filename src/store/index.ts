import { configureStore } from "@reduxjs/toolkit";
import ModuleActiveSlice from "../Feature/ModuleActiveSlice";
import IsAuthenticatedSlice from "../Feature/IsAuthenticatedSlice";

const store = configureStore({
    reducer: {
        moduleActive: ModuleActiveSlice,
        isAuthenticated: IsAuthenticatedSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;