import { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./Home";
import Basket from "./Basket";
import ProductCard from "./ProductCard";
import Term from "./Term";
import Contact from "./Contact";
import Wishlist from "./Wishlist";
import ScrollTop from "./scroll_top/ScrollTop";
import CategoryItems from "./СategoryItems";
import "typeface-kanit";
import {
  ActiveSlideContext,
  CategoriesContext,
  MenuContext,
  SliderContext,
  TopProductContext,
  ChangeSearchContext,
  WishlistContext,
  StorageContext,
  TokensContext,
} from "./context/Context";
import {
  getCategories,
  getSlider,
  getTopProducts,
  getSearchProduct,
} from "./api/UrlApi";
import SignUp from "./profile/SignUp";
import SignIn from "./profile/SignIn";
import MyOrders from "./my_orders/MyOrders";
import jwt_decode from "jwt-decode";
import { isJwtExpired } from "jwt-check-expiration";

function App() {
  const [menuBar, setMenuBar] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [slider, setSlider] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [topProduct, setTopProduct] = useState([]);
  const [categoryId, setCatgeoryId] = useState();
  const [loading, setLoading] = useState(true);
  const [cartStorage, setCartStorage] = useLocalStrage("product", []);
  const [likedProduct, setLikedProduct] = useLocalStrage("wishlist", []);
  const [changeSearch, setChangeSearch] = useState([]);
  const [search, setSearch] = useState();
  const [refreshToken, setRefreshToken] = useState(true);
  let getToken = localStorage.getItem("refresh");
  useEffect(() => {
    if (getToken && getToken !== null) {
      setRefreshToken(isJwtExpired(localStorage.getItem("refresh")));
    } else {
      setRefreshToken(true);
    }
  });

  function useLocalStrage(key, oldValue) {
    const [storedValue, setStoredValue] = useState(() => {
      const getValue = localStorage.getItem(key);
      return getValue ? JSON.parse(getValue) : oldValue;
    });
    const setStorage = (value) => {
      localStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    };
    return [storedValue, setStorage];
  }

  const removeLocalStorage = (id, color, size) => {
    let filterCart = null;
    cartStorage.forEach((element) => {
      if (
        element.productId === id &&
        element.color_id === color &&
        element.selectSize === size
      ) {
        return (filterCart = element);
      }
    });
    const deleteItem = cartStorage.filter((item) => {
      return item !== filterCart;
    });
    setCartStorage(deleteItem);
  };

  useEffect(() => {
    setLoading(true);
    getCategories().then((categorie) => {
      setCategories(categorie.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getSlider().then((sliderItems) => {
      setSlider(sliderItems.data);
    });
  }, []);

  useEffect(() => {
    getTopProducts().then((products) => {
      setTopProduct(products.data);
    });
  }, []);

  useEffect(() => {
    if (changeSearch.length > 1) {
      getSearchProduct(changeSearch).then((getSearchItem) => {
        setSearch(getSearchItem.data.results);
      });
    } else {
      setSearch([]);
    }
  }, [changeSearch]);

  const getCategoryId = (slug) => {
    setCatgeoryId(slug);
  };
  return (
    <div className="app">
      <Router>
        <ScrollTop />
        <StorageContext.Provider
          value={{ removeLocalStorage, cartStorage, setCartStorage }}
        >
          <CategoriesContext.Provider
            value={{ categories, getCategoryId, loading, setLoading }}
          >
            <MenuContext.Provider value={[menuBar, setMenuBar]}>
              <WishlistContext.Provider
                value={{ wishlist, setWishlist, likedProduct, setLikedProduct }}
              >
                <SliderContext.Provider value={{ slider }}>
                  <ActiveSlideContext.Provider
                    value={[activeSlide, setActiveSlide]}
                  >
                    <TopProductContext.Provider
                      value={{ topProduct, categoryId }}
                    >
                      <ChangeSearchContext.Provider
                        value={{
                          search,
                          setSearch,
                          setChangeSearch,
                        }}
                      >
                        <TokensContext.Provider
                          value={[refreshToken, setRefreshToken]}
                        >
                          <Switch>
                            <Route path="/" exact component={Home} />
                            <Route
                              path="/product_card/:slug"
                              component={ProductCard}
                            />
                            <Route path="/wishlist" component={Wishlist} />
                            <Route path="/contact" component={Contact} />
                            <Route path="/basket" component={Basket} />
                            <Route
                              path="/category/:slug"
                              component={CategoryItems}
                            />
                            <Route path="/search/:slug" component={Term} />
                            <Route path="/user/sign_in" component={SignIn} />
                            <Route path="/user/sign_up" component={SignUp} />
                            <Route path="/my_orders" component={MyOrders} />
                          </Switch>
                        </TokensContext.Provider>
                      </ChangeSearchContext.Provider>
                    </TopProductContext.Provider>
                  </ActiveSlideContext.Provider>
                </SliderContext.Provider>
              </WishlistContext.Provider>
            </MenuContext.Provider>
          </CategoriesContext.Provider>
        </StorageContext.Provider>
      </Router>
    </div>
  );
}

export default App;
