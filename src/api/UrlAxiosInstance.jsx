import axios from "axios";
import { isJwtExpired } from "jwt-check-expiration";

const baseURL = "https://www.uktamjon.uz/api";
const getAccess = JSON.parse(localStorage.getItem("access"));
console.log(getAccess);
export const likeAxiosInstance = axios.create({
  baseURL,
  // timeout: 5000,
  headers: {
    Authorization: `Bearer ${getAccess}`,
    "Content-Type": "application/json",
  },
});

likeAxiosInstance.interceptors.request.use(async (req) => {
  const refreshToken = JSON.parse(localStorage.getItem("refresh"));
  if (!refreshToken) {
    window.location.href = "/user/sign_in";
  }
  if (!isJwtExpired(getAccess)) return req;
  const response = await axios.post(`${baseURL}/refresh/`, {
    refresh: refreshToken,
  });
  localStorage.setItem("access", JSON.stringify(response.data.data.access));
  req.headers.Authorization = `Bearer ${response.data.data.access}`;
  return req;
});
