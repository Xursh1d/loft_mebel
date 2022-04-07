import Menu from "./homePage/Menu";
import MenuBar from "./homePage/menuComponents/MenuBar";
import LogoSearch from "./homePage/LogoSearch";
import {
  CategoriesContext,
  MenuContext,
  TopProductContext,
  ChangeSearchContext,
  WishlistContext,
} from "./context/Context";
import Footer from "./homePage/Footer";
import Input from "./homePage/Input";
import { useContext } from "react";
import EachProductCard from "./productCard/EachProductCard";
import BestSellers from "./homePage/products/BestSellers";
import Categories from "./homePage/Categories";
import { useState, useEffect } from "react";
import { productCallForId } from "./api/UrlApi";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import WishlistProducts from "./wishlist/WishlistProducts";
export default function ProductCard() {
  const { slug } = useParams();
  const { setChangeSearch, setSearch, search } =
    useContext(ChangeSearchContext);
  const { setWishlist } = useContext(WishlistContext);
  const { categories } = useContext(CategoriesContext);
  const [menuBar, setMenuBar] = useContext(MenuContext);
  const { topProduct, categoryId } = useContext(TopProductContext);
  const [productCard, setProductCard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [childPhoto, setChildPhoto] = useState();

  const handleCloseMenu = () => {
    setMenuBar(false);
    setWishlist(false);
  };
  useEffect(() => {
    setLoading(true);
    productCallForId(slug).then((productCall) => {
      setProductCard(productCall.data);
      setLoading(false);
      setSearch([]);
    });
  }, [slug]);

  useEffect(() => {
    setChildPhoto(productCard.photo);
  }, [productCard]);

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
      <EachProductCard
        categories={categories}
        productCard={productCard}
        setChildPhoto={setChildPhoto}
        childPhoto={childPhoto}
      />
      {topProduct.length ? (
        <BestSellers topProduct={topProduct} categoryId={categoryId} />
      ) : (
        <h6 className="empty_text">No product in this category</h6>
      )}
      <Footer categories={categories} />
    </div>
  );
}
