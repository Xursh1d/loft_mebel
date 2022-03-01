import React, { useEffect, useState } from "react";
import Menu from "./homePage/Menu";
import MenuBar from "./homePage/menuComponents/MenuBar";
import LogoSearch from "./homePage/LogoSearch";
import { useParams } from "react-router";
import Search from "./term/Search";
import {
  CategoriesContext,
  MenuContext,
  ChangeSearchContext,
} from "./context/Context";
import Footer from "./homePage/Footer";
import Categories from "./homePage/Categories";
import Input from "./homePage/Input";
import ReactLoading from "react-loading";
import { useContext } from "react";
import { getSearchProduct } from "./api/UrlApi";

export default function Term() {
  const { slug } = useParams();
  const { categories, loading, setLoading } = useContext(CategoriesContext);
  const { setSearch, search, setChangeSearch} =
    useContext(ChangeSearchContext);
  const [menuBar, setMenuBar] = useContext(MenuContext);
  const [searchProducts, setSearchProducts] = useState([]);
  useEffect(() => {
    setLoading(true);
    getSearchProduct(slug).then((getSearchItem) => {
      setSearchProducts(getSearchItem.data.results);
      setLoading(false);
    });
    setSearch([]);
  }, [slug]);
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
    <div onClick={() => setMenuBar(false)}>
      <MenuBar
        categories={categories}
        menuBar={menuBar}
        setMenuBar={setMenuBar}
      />
      <Menu />
      <LogoSearch
        active_basket_page="active_page"
        setMenuBar={setMenuBar}
        search={search}
        setChangeSearch={setChangeSearch}
      />
      <Input
      className="mobile_term"
        setChangeSearch={setChangeSearch}
        search={search}
        style={"mobile-input"}
        type={"text"}
        palceholder={"Search"}
      />
      <Categories categories={categories} />
      <Search searchProducts={searchProducts} />
      <Footer categories={categories} />
    </div>
  );
}
