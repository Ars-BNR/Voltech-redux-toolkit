import exitService from "../services/exit.service";
import refreshService from "../services/refresh.service";
import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";
import loginService from "../services/login.service";
import registerService from "../services/register.service";
import { authActions } from "./reducer";

export const login = createAsyncThunk(
  "auth/login",
  async ({ login, password, navigate }, { dispatch }) => {
    try {
      const response = await loginService.login(login, password);
      localStorage.setItem("token", response.accessToken);
      dispatch(authActions.setAuth(true));
      dispatch(authActions.setProfiles(response.profiles));
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }
);

export const registration = createAsyncThunk(
  "auth/registration",
  async ({ login, password, navigate }, { dispatch }) => {
    try {
      const response = await registerService.registration(login, password);
      localStorage.setItem("token", response.accessToken);
      dispatch(authActions.setAuth(true));
      dispatch(authActions.setProfiles(response.profiles));
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async ({ navigate }, { dispatch }) => {
    try {
      await exitService.logout();
      localStorage.removeItem("token");
      dispatch(authActions.setAuth(false));
      dispatch(authActions.setProfiles({}));
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { dispatch }) => {
    dispatch(authActions.setLoading(true));
    try {
      const response = await refreshService.refresh();
      localStorage.setItem("token", response.accessToken);
      dispatch(authActions.setAuth(true));
      dispatch(authActions.setProfiles(response.profiles));
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      dispatch(authActions.setLoading(false));
    }
  }
);
