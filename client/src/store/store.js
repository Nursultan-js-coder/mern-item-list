import { createStore, applyMiddleware, combineReducers } from "redux";
import { itemReducer } from "./reducers/item";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));
const rootReducer = combineReducers({
  item: itemReducer,
});

export const store = createStore(rootReducer, composedEnhancer);
