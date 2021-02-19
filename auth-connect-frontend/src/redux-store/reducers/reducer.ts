import { Action } from "../actionTypes";
import { InitialEntityState } from "../types";

export const intialState: InitialEntityState = {
  user: {},
  entities: {
    accessToken: false,
    logout: false,
  },
  error: false,
};

function rootReducer(
  state: InitialEntityState = intialState,
  action: Action
): InitialEntityState {
  switch (action.type) {
    case "SIGNUP_USER": {
      return {
        ...state,
        user: action.user,
        error: action.error,
      };
    }
    case "LOGIN_USER": {
      return {
        ...state,
        user: action.payload.user,
        entities: {
          ...state.entities,
          accessToken: action.payload.accessToken,
        },
        error: action.payload.error,
      };
    }
    case "LOGOUT_USER": {
      return {
        user: {},
        entities: undefined,
        error: undefined,
      };
    }
    case "API_ERROR": {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
}

export default rootReducer;
