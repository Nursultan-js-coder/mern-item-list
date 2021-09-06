import {
  AUTH_LOADING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  USER_LOAD_ERROR,
  USER_LOADED,
  USER_LOGOUT_SUCCESS,
} from "../constants/auth";

export const userRegistered = (payload) => {
  return { type: REGISTER_SUCCESS, payload };
};
export const userLoggedIn = (payload) => {
  return { type: LOGIN_SUCCESS, payload };
};
export const userLoginError = (payload) => {
  return { type: LOGIN_ERROR, payload };
};
export const loading = (payload) => {
  return { type: AUTH_LOADING, payload };
};
export const userRegisterError = (payload) => {
  return { type: REGISTER_ERROR, payload };
};
export const userLoaded = (payload) => {
  return { type: USER_LOADED, payload };
};
export const userLoadError = (payload) => {
  return { type: USER_LOAD_ERROR, payload };
};
export const userLoggedOut = (payload) => {
  return { type: USER_LOGOUT_SUCCESS, payload };
};
