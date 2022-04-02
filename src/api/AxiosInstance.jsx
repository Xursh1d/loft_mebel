import axios from "axios";
const baseURL = "https://www.uktamjon.uz/api";

export const axiosInstance = axios.create({
  baseURL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
