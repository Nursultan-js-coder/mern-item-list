import { request } from "./apiClient";

export const item = {
  getItems: () => request.get("/items"),
  postItem: (item) =>
    request.post("/items", {
      name: item,
      date: new Date().toLocaleDateString(),
    }),
  deleteItem: (id) => request.delete(`/items/${id}`),
};
