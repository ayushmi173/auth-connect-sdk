import { Action } from "../actionTypes";
import { InitialEntityState } from "../types";

export const initialState: InitialEntityState = {
  user: {},
  entities: {
    login: false,
    logout: false,
  },
  error: false,
};

function rootReducer(
  state: InitialEntityState = initialState,
  action: Action
): InitialEntityState {
  switch (action.type) {
    case "SIGNUP_USER": {
      return {
        ...state,
        user: action.user,
        entities: {
          ...state.entities,
          logout: false,
        },
        error: action.error,
      };
    }
    case "LOGIN_USER": {
      return {
        ...state,
        user: action.payload.user,
        entities: {
          logout: false,
          login: action.payload.login,
        },
        error: action.payload.error,
      };
    }
    case "LOGOUT_USER": {
      return {
        user: {},
        entities: {
          logout: true,
          login: false,
        },
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
