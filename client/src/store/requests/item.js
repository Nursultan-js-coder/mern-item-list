import {
  itemAdded,
  itemsLoaded,
  itemError,
  itemLoading,
  itemDeleted,
} from "../actions/item";
import { clientAPI } from "../../api/apiClient";

export const fetchItems = async (dispatch, getStore) => {
  dispatch(itemLoading(true));
  const response = await clientAPI.item.getItems().then((res) => res.data);
  dispatch(itemsLoaded(response));
  dispatch(itemLoading(false));
};

export const saveItem = (item) => async (dispatch, getStore) => {
  dispatch(itemLoading(true));
  const response = await clientAPI.item
    .postItem(item)
    .then((res) => res.data)
    .catch((err) => dispatch(itemError(JSON.stringify(err))));
  console.log(response);
  dispatch(itemAdded(response));
  dispatch(itemLoading(false));
};

export const deleteItem = (id) => async (dispatch, getStore) => {
  dispatch(itemLoading(true));
  const response = await clientAPI.item
    .deleteItem(id)
    .then((res) => res.data)
    .catch((err) => dispatch(itemError(JSON.stringify(err))));
  console.log(response);
  dispatch(itemDeleted(id));
  dispatch(itemLoading(false));
};
