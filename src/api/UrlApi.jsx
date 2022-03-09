import axios from "axios";

export const getCategories = async () => {
  const categorie = await axios.get("https://www.uktamjon.uz/api/categories/");
  return categorie;
};

export const productCallForId = async (slug) => {
  const productCall = await axios.get(
    `https://www.uktamjon.uz/api/products/${slug}/`
  );

  return productCall;
};
export const getSlider = async () => {
  const sliderItems = await axios.get("https://www.uktamjon.uz/api/banners/");
  return sliderItems;
};
export const getTopProducts = async () => {
  const products = await axios.get("https://www.uktamjon.uz/api/products/top/");
  return products;
};
export const getTopCategoryItem = async (slug, min, max, color, size) => {
  const category = await axios.get(
    `https://www.uktamjon.uz/api/categories/${slug}/products/?min_price=${min}&max_price=${max}&colors=${color}&size=${size}`
  );
  return category;
};
export const getTopDiscountItem = async () => {
  const discountProduct = await axios.get(
    `https://www.uktamjon.uz/api/products/discounted/`
  );
  return discountProduct;
};
export const getCategoryColors = async (slug) => {
  const getColors = await axios.get(
    `https://www.uktamjon.uz/api/colors/?category=${slug}`
  );
  return getColors;
};
export const getMinAndMaxCategoryPrice = async (slug) => {
  const getPrice = await axios.get(
    `https://www.uktamjon.uz/api/categories/${slug}/prices`
  );
  return getPrice;
};
export const getFilterCategorySize = async (slug) => {
  const getSize = await axios.get(
    `https://www.uktamjon.uz/api/size/?category=${slug}`
  );
  return getSize;
};
export const getLatestProducts = async () => {
  const getProducts = await axios.get(
    `https://www.uktamjon.uz/api/products/latest`
  );
  return getProducts;
};
export const getSearchProduct = async (title) => {
  const getSearchItem = await axios.get(
    `https://www.uktamjon.uz/api/products/?term=${title}`
  );
  return getSearchItem;
};
export const checkEmail = async (email) => {
  const postEmail = await axios.post(
    "https://www.uktamjon.uz/api/check-email/",
    {
      email: email,
    }
  );
  return postEmail;
};
export const checkOtpCode = async (email, token, code) => {
  const postOtpCode = await axios.post(
    "https://www.uktamjon.uz/api/check-otp/",
    {
      email: email,
      token: token,
      code: code,
    }
  );
  return postOtpCode;
};
