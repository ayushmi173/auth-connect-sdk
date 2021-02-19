import { IUser } from "./types";

export type Action =
  | {
      type: "SIGNUP_USER";
      user: IUser;
      error: boolean;
    }
  | {
      type: "LOGIN_USER";
      payload: { user: IUser; login: boolean; error: boolean };
    }
  | {
      type: "LOGOUT_USER";
    }
  | {
      type: "API_ERROR";
      payload: boolean;
    };
