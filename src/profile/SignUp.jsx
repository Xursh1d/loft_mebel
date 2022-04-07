import { useEffect } from "react";
import "./Profile.css";
import "typeface-poppins";
import "react-toastify/dist/ReactToastify.css";
import Menu from "../homePage/Menu";
import MenuBar from "../homePage/menuComponents/MenuBar";
import LogoSearch from "../homePage/LogoSearch";
import {
  CategoriesContext,
  ChangeSearchContext,
  MenuContext,
  WishlistContext,
} from "../context/Context";
import Footer from "../homePage/Footer";
import Categories from "../homePage/Categories";
import Input from "../homePage/Input";
import { useContext } from "react";
import ReactLoading from "react-loading";
import CreateAccount from "./CreateAccount";
import "../homePage/Home.css";
import WishlistProducts from "../wishlist/WishlistProducts";
export default function SignUp() {
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
      <CreateAccount />
    </div>
  );
}
