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
import { setCookie, getCookie } from "../utils";

const AUTH_INIT_STATE = {
  loading: false,
  error: null,
  user: null,
  isAuthenticated: false,
  token: getCookie("token"),
};

export const authReducer = (state = AUTH_INIT_STATE, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case REGISTER_ERROR:
    case LOGIN_ERROR:
    case USER_LOAD_ERROR:
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      setCookie("token", action.payload.token, 10);
      console.log({ ...action.payload });
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case USER_LOGOUT_SUCCESS:
      setCookie("token", undefined, 10);
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
      };

    default:
      return state;
  }
};
