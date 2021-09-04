import {
  ITEMS_DROPPED,
  ITEMS_LOADED,
  ITEM_ADDED,
  ITEM_DELETED,
  ITEM_EDITED,
  ITEM_ERROR,
  ITEM_LOADING,
} from "../constants/item";

export const itemAdded = (item) => {
  return {
    type: ITEM_ADDED,
    payload: item,
  };
};
export const itemDeleted = (_id) => {
  return {
    type: ITEM_DELETED,
    payload: _id,
  };
};
export const itemError = (error) => {
  return {
    type: ITEM_ERROR,
    payload: error,
  };
};

export const itemsLoaded = (items) => {
  return {
    type: ITEMS_LOADED,
    payload: { items },
  };
};

export const itemsDropped = () => {
  return {
    type: ITEMS_DROPPED,
  };
};

export const itemLoading = (isLoading) => {
  return {
    type: ITEM_LOADING,
    payload: isLoading,
  };
};
