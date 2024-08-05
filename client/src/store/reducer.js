import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profiles: {},
  isAuth: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setProfiles: (state, action) => {
      state.profiles = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
