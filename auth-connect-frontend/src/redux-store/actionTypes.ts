import { IUser } from "./types";

export type Action =
  | {
      type: "SIGNUP_USER";
      user: IUser;
      error: boolean;
    }
  | {
      type: "LOGIN_USER";
      payload: { user: IUser; accessToken: string; error: boolean };
    }
  | {
      type: "LOGOUT_USER";
    }
  | {
      type: "API_ERROR";
      payload: boolean;
    }
  | {
      type: "PROFILE";
      payload: {
        userProfile: IUser;
      };
      error: boolean;
    };
