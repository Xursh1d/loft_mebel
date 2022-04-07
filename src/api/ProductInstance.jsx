import axios from "axios";
import { isJwtExpired } from "jwt-check-expiration";

const baseURL = "https://www.uktamjon.uz/api";
const getAccess = JSON.parse(localStorage.getItem("access"));
console.log(getAccess);
export const productAxiosInterseptor = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

productAxiosInterseptor.interceptors.request.use(async (req) => {
  const refreshToken = JSON.parse(localStorage.getItem("refresh"));
  if (!refreshToken) {
    return req;
  } else {
    if (!isJwtExpired(getAccess)) {
      req.headers.Authorization = `Bearer ${getAccess}`;
      return req;
    } else {
      const response = await axios.post(`${baseURL}/refresh/`, {
        refresh: refreshToken,
      });
      localStorage.setItem("access", JSON.stringify(response.data.data.access));
      req.headers.Authorization = `Bearer ${response.data.data.access}`;
      return req;
    }
  }
});
