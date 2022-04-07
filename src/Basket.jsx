import React, { useEffect, useState } from "react";
import Menu from "./homePage/Menu";
import MenuBar from "./homePage/menuComponents/MenuBar";
import LogoSearch from "./homePage/LogoSearch";
import {
  CategoriesContext,
  MenuContext,
  ChangeSearchContext,
  WishlistContext,
} from "./context/Context";
import Footer from "./homePage/Footer";
import Categories from "./homePage/Categories";
import Input from "./homePage/Input";
import ReactLoading from "react-loading";
import { useContext } from "react";
import ShopProduct from "./basket/ShopProduct";
import LastProducts from "./basket/LastProducts";
import { getLatestProducts } from "./api/UrlApi";
import WishlistProducts from "./wishlist/WishlistProducts";

export default function Basket() {
  const { categories, loading, setLoading } = useContext(CategoriesContext);
  const { setWishlist } = useContext(WishlistContext);
  const { setSearch, search, setChangeSearch } =
    useContext(ChangeSearchContext);
  const [menuBar, setMenuBar] = useContext(MenuContext);
  const [lastProducts, setLastProducts] = useState([]);
  useEffect(() => {
    setLoading(true);
    getLatestProducts().then((getProducts) => {
      setLastProducts(getProducts.data);
      setLoading(false);
      setSearch([]);
    });
  }, []);
  const handleCloseMenu = () => {
    setMenuBar(false);
    setWishlist(false);
  };
  return loading ? (
    <div className="loader">
      <h6>Loading</h6>
      <ReactLoading
        className="loading"
        type={"spinningBubbles"}
        color={"#245462"}
        height={"50px"}
        width={"50px"}
      />
    </div>
  ) : (
    <div onClick={() => handleCloseMenu()}>
      <MenuBar
        categories={categories}
        menuBar={menuBar}
        setMenuBar={setMenuBar}
      />
      <Menu />
      <WishlistProducts />
      <LogoSearch
        active_basket_page="active_page"
        setMenuBar={setMenuBar}
        search={search}
        setChangeSearch={setChangeSearch}
      />
      <Input
        setChangeSearch={setChangeSearch}
        search={search}
        style={"mobile-input"}
        type={"text"}
        palceholder={"Search"}
      />
      <Categories categories={categories} />
      <ShopProduct />
      <LastProducts lastProducts={lastProducts} />
      <Footer categories={categories} />
    </div>
  );
}
