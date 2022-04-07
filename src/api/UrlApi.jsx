import { axiosInstance } from "./AxiosInstance";

export const getCategories = async () => {
  const categorie = await axiosInstance.get("/categories/");
  return categorie;
};

export const productCallForId = async (slug) => {
  const productCall = await axiosInstance.get(`/products/${slug}/`);
  return productCall;
};
export const getSlider = async () => {
  const sliderItems = await axiosInstance.get("/banners/");
  return sliderItems;
};
export const getTopProducts = async () => {
  const products = await axiosInstance.get("/products/top/");
  return products;
};
export const getTopCategoryItem = async (slug, min, max, color, size) => {
  const category = await axiosInstance.get(
    `/categories/${slug}/products/?min_price=${min}&max_price=${max}&colors=${color}&size=${size}`
  );
  return category;
};
export const getTopDiscountItem = async () => {
  const discountProduct = await axiosInstance.get(`/products/discounted/`);
  return discountProduct;
};
export const getCategoryColors = async (slug) => {
  const getColors = await axiosInstance.get(`/colors/?category=${slug}`);
  return getColors;
};
export const getMinAndMaxCategoryPrice = async (slug) => {
  const getPrice = await axiosInstance.get(`/categories/${slug}/prices`);
  return getPrice;
};
export const getFilterCategorySize = async (slug) => {
  const getSize = await axiosInstance.get(`/size/?category=${slug}`);
  return getSize;
};
export const getLatestProducts = async () => {
  const getProducts = await axiosInstance.get(`/products/latest`);
  return getProducts;
};
export const getSearchProduct = async (title) => {
  const getSearchItem = await axiosInstance.get(`/products/?term=${title}`);
  return getSearchItem;
};
export const checkEmail = async (email) => {
  const response = await axiosInstance.post("/check-email/", {
    email: email,
  });
  return response;
};
export const checkOtpCode = async (email, token, code) => {
  const postOtpCode = await axiosInstance.post("/check-otp/", {
    email: email,
    token: token,
    code: code,
  });
  return postOtpCode;
};
export const createAccount = async (
  token,
  fullname,
  phone,
  password,
  gender,
  photo
) => {
  const response = await axiosInstance.post("/sign-up/", {
    token: token,
    fullname: fullname,
    phone: phone,
    password: password,
    gender: gender,
    photo: photo,
  });
  return response;
};
export const checkUserName = async (username, password) => {
  const response = await axiosInstance.post("/login/", {
    username: username,
    password: password,
  });
  return response;
};
// export const likeProduct = async (_id) => {
//   const response = await likeAxiosInstance.post("/wishlist/", { product: _id });
//   if (response.status === 200) {
//     return response.data;
//   }
// };
// export const removeLikedPoduct = async (id) => {
//   const response = await likeAxiosInstance.delete(`/wishlist/${id}/`);
//   console.log(response.status);
//   if (response.status === 204) {
//     return true;
//   } else return false;
// };
