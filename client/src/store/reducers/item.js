import { v4 } from "uuid";
import {
  ITEMS_DROPPED,
  ITEMS_LOADED,
  ITEM_ADDED,
  ITEM_DELETED,
  ITEM_EDITED,
  ITEM_ERROR,
  ITEM_LOADING,
} from "../constants/item";
const initState = {
  loading: false,
  error: null,
  entities: [],
};

export const itemReducer = (state = initState, action) => {
  switch (action.type) {
    case ITEM_ADDED:
      const newState = {
        ...state,
        entities: [...state.entities, { ...action.payload }],
      };
      console.log("new state:", newState);
      console.log("action:", action);
      return newState;

    case ITEM_DELETED:
      return {
        ...state,
        entities: state.entities.filter((item) => item._id !== action.payload),
      };

    case ITEMS_LOADED:
      return {
        ...state,
        entities: [...state.entities, ...action.payload.items],
      };
    case ITEM_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ITEM_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ITEMS_DROPPED:
      return {
        ...state,
        entities: [],
      };

    default:
      return state;
  }
};
