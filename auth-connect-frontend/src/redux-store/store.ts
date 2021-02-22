import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer, { initialState } from "../redux-store/reducers/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { InitialEntityState } from "./types";
import { createWrapper, MakeStore, Context } from "next-redux-wrapper";

const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

export const makeStore: MakeStore<InitialEntityState> = (context: Context) =>
  createStore(rootReducer, initialState, enhancer);

export const wrapper = createWrapper<InitialEntityState>(makeStore, {
  debug: true,
});
