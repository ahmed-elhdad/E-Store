import axios from "axios";
export const formDataInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": `application/form-data`,
  },
});
export const defaultInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": `application/json`,
  },
});
