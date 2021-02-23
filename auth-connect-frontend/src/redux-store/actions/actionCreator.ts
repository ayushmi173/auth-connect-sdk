import { Action, Dispatch } from "redux";
import { IGetUser, IUser } from "../types";
import * as api from "../../rest-api/api";

export const userSignUp = (
  username: string,
  password: string,
  email: string
) => async (dispatch: Dispatch<Action>) => {
  const response = await api.post(`/signup`, {
    username,
    password,
    email,
  });

  if (response.ok) {
    const userResponse: IUser = await response.json();

    dispatch({
      type: "SIGNUP_USER",
      user: userResponse,
      error: false,
    });
  } else {
    dispatch({ type: "API_ERROR", payload: true });
  }
};

export const userSignIn = (username: string, password: string) => async (
  dispatch: Dispatch<Action>
) => {
  const response = await api.post("/signin", {
    username,
    password,
  });

  if (response.ok) {
    const userResponse: IGetUser = await response.json();
    if (userResponse.accessToken) {
      dispatch({
        type: "LOGIN_USER",
        payload: {
          user: userResponse.user,
          accessToken: userResponse.accessToken,
          error: false,
        },
      });
    }
  } else {
    dispatch({ type: "API_ERROR", payload: true });
  }
};

export const getMe = () => async (dispatch: Dispatch<Action>) => {
  const response = await api.get("/me");
  if (response.ok) {
    const getMeUser: IUser = await response.json();

    dispatch({
      type: "PROFILE",
      payload: {
        userProfile: getMeUser,
      },
    });
  } else {
    dispatch({ type: "API_ERROR", payload: true });
  }
};
