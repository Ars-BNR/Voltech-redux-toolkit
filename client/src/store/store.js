import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducer";
import { defaultToolkitReducer } from "./defaultToolkitReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  authDefaultToolkit: defaultToolkitReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
