import axios from "axios";
import { item } from "./item";
const BASE_API_URL = "http://localhost:9000/api";

export const request = axios.create({
  responseType: "json",
  baseURL: BASE_API_URL,
});

export const clientAPI = {
  item,
};
