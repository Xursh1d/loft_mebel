import "./App.css";
import { useEffect } from "react";
import Menu from "./homePage/Menu";
import LogoSearch from "./homePage/LogoSearch";
import Categories from "./homePage/Categories";
import MenuBar from "./homePage/menuComponents/MenuBar";
import {
  CategoriesContext,
  MenuContext,
  SliderContext,
  ActiveSlideContext,
  TopProductContext,
  ChangeSearchContext,
  WishlistContext,
} from "./context/Context";
import { useContext } from "react";
import Input from "./homePage/Input";
import Slider from "./homePage/silder/Slider";
import Footer from "./homePage/Footer";
import ReactLoading from "react-loading";
import BestSellers from "./homePage/products/BestSellers";
import WishlistProducts from "./wishlist/WishlistProducts";

export default function Home() {
  const { categories, getCategoryId, loading } = useContext(CategoriesContext);
  const { slider } = useContext(SliderContext);
  const [menuBar, setMenuBar] = useContext(MenuContext);
  const [activeSlide, setActiveSlide] = useContext(ActiveSlideContext);
  const { topProduct, categoryId } = useContext(TopProductContext);
  const { setWishlist } = useContext(WishlistContext);
  const { setSearch, setChangeSearch, search } =
    useContext(ChangeSearchContext);
  useEffect(() => {
    setSearch([]);
  }, []);
  const handleCloseMenu = () => {
    setMenuBar(false);
    setWishlist(false);
  };

  document.title = "Loft Mebel";
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
        getCategoryId={getCategoryId}
      />
      <Menu />
      <WishlistProducts />
      <LogoSearch
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
      <Categories getCategoryId={getCategoryId} categories={categories} />
      <Slider
        slider={slider}
        activeSlide={activeSlide}
        setActiveSlide={setActiveSlide}
      />
      {topProduct.length ? (
        <BestSellers topProduct={topProduct} categoryId={categoryId} />
      ) : (
        <h6 className="empty_text">No product in this category</h6>
      )}
      <Footer categories={categories} getCategoryId={getCategoryId} />
    </div>
  );
}
