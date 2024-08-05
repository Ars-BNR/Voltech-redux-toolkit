import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
  profiles: {},
  isAuth: false,
  isLoading: false,
};

export const setAuth = createAction("setAuth");
export const setProfiles = createAction("setProfiles");
export const setLoading = createAction("setLoading");

const defaultToolkitReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAuth, (state, action) => {
      state.isAuth = action.payload;
    })
    .addCase(setProfiles, (state, action) => {
      state.profiles = action.payload;
    })
    .addCase(setLoading, (state, action) => {
      state.isLoading = action.payload;
    });
});
export { defaultToolkitReducer };
