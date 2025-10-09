import { createSlice } from "@reduxjs/toolkit";

type IsAuthenticatedState = { value: boolean; };

const initialState: IsAuthenticatedState = { value: false };

const IsAuthenticatedSlice = createSlice({
  name: "isAuthenticated",
  initialState ,
  reducers: {
    login: (state) => { state.value = true; },
    logout: (state) => { state.value = false; },
  },
});
export const { login, logout } = IsAuthenticatedSlice.actions;
export default IsAuthenticatedSlice.reducer;
