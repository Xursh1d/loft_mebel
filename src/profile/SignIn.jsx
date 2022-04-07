import React, { useEffect } from "react";
import "./Profile.css";
import Menu from "../homePage/Menu";
import LogIn from "./LogIn";
import MenuBar from "../homePage/menuComponents/MenuBar";
import LogoSearch from "../homePage/LogoSearch";
import {
  CategoriesContext,
  ChangeSearchContext,
  MenuContext,
  WishlistContext,
} from "../context/Context";
import Categories from "../homePage/Categories";
import Input from "../homePage/Input";
import ReactLoading from "react-loading";
import "../homePage/Home.css";
import { useContext } from "react";
import { Redirect } from "react-router";
import WishlistProducts from "../wishlist/WishlistProducts";

export default function SignIn() {
  const { categories, loading } = useContext(CategoriesContext);
  const [menuBar, setMenuBar] = useContext(MenuContext);
  const { setWishlist } = useContext(WishlistContext);
  const { setSearch, setChangeSearch, search } =
    useContext(ChangeSearchContext);
  const handleCloseMenu = () => {
    setMenuBar(false);
    setWishlist(false);
  };
  useEffect(() => {
    setSearch([]);
  }, []);
  const getRefresh = localStorage.getItem("refresh");
  if (getRefresh) {
    return <Redirect to="/" />;
  }
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
        active_contact_page="active_page"
        search={search}
        setMenuBar={setMenuBar}
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
      <LogIn />
    </div>
  );
}
