import React from "react";
import { useEffect } from "react";
import Menu from "./homePage/Menu";
import MenuBar from "./homePage/menuComponents/MenuBar";
import LogoSearch from "./homePage/LogoSearch";
import {
  CategoriesContext,
  ChangeSearchContext,
  MenuContext,
} from "./context/Context";
import Footer from "./homePage/Footer";
import Categories from "./homePage/Categories";
import Input from "./homePage/Input";
import { useContext } from "react";

export default function Wishlist() {
  const { categories } = useContext(CategoriesContext);
  const [menuBar, setMenuBar] = useContext(MenuContext);
  const { setSearch, setChangeSearch, search} =
    useContext(ChangeSearchContext);
  useEffect(() => {
    setSearch([]);
  }, []);
  return (
    <div onClick={() => setMenuBar(false)}>
      <MenuBar
        categories={categories}
        menuBar={menuBar}
        setMenuBar={setMenuBar}
      />
      <Menu />
      <LogoSearch
        active_wishlist_page="active_page"
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
      <Footer categories={categories} />
    </div>
  );
}
