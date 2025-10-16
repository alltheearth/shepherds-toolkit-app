import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ShowProfileState = {
    showProfile: boolean;
};

const initialState: ShowProfileState = {
    showProfile: false,
};

const ShowProfileSlice = createSlice({
  name: "showProfile",
  initialState,
  reducers: {
    setShowProfile: (state, action:PayloadAction<boolean>) => {    
        state.showProfile = action.payload;
    },
  },
}); 
export const { setShowProfile } = ShowProfileSlice.actions;
export default ShowProfileSlice.reducer;
