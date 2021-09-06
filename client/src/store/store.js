import { createStore, applyMiddleware, combineReducers } from "redux";
import { itemReducer } from "./reducers/item";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./reducers/auth";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));
const rootReducer = combineReducers({
  item: itemReducer,
  auth: authReducer,
});

export const store = createStore(rootReducer, composedEnhancer);
