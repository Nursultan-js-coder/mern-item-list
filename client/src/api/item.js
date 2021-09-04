import axios from "axios";

export const item = {
  getItems: () => axios.get("/items"),
  postItem: (item) =>
    axios.post("/items", {
      name: item,
      date: new Date().toLocaleDateString(),
    }),
  deleteItem: (id) => axios.delete(`/items/${id}`),
};
