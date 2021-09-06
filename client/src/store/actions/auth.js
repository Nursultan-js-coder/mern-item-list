import { request } from "../../api/apiClient";
import {
  userRegistered,
  loading,
  userRegisterError,
  userLoggedIn,
  userLoginError,
  userLoadError,
  userLoaded,
} from "./auth-action-creator";
import { setConfig } from "../utils";

export const registerUser =
  ({ name, email, password }) =>
  (dispatch, getState) => {
    dispatch(loading(true));
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, email, password });
    request
      .post("/auth/register", body, config)
      .then((res) => res.data)
      .then((user) => {
        dispatch(userRegistered(user));
      })
      .catch((err) => {
        dispatch(userRegisterError(JSON.stringify(err.msg)));
      })
      .finally(() => {
        dispatch(loading(false));
      });
  };

export const loginUser =
  ({ email, password }) =>
  (dispatch, getState) => {
    dispatch(loading(true));
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });

    request
      .post("/auth/login", body, config)
      .then((res) => res.data)
      .then((user) => {
        dispatch(userLoggedIn(user));
      })
      .catch((err) => {
        dispatch(userLoginError(JSON.stringify(err.msg)));
      })
      .finally(() => {
        dispatch(loading(false));
      });
  };
export const loadUser = () => (dispatch, getState) => {
  dispatch(loading(true));
  request
    .get("/auth/user", setConfig(getState))
    .then((res) => res.data)
    .then((user) => {
      dispatch(userLoaded(user));
    })
    .catch((err) => {
      dispatch(userLoadError(JSON.stringify(err)));
    })
    .finally(() => {
      dispatch(loading(false));
    });
};
