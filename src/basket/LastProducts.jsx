import React from "react";
import "../homePage/Home.css";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import { photoUrl } from "../helpers/photo_url_fixer";
import stock from "../LoftMebelPhoto/stock.svg";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useContext } from "react";
import { StorageContext, WishlistContext } from "../context/Context";

export default function LastProducts({ lastProducts }) {
  const { cartStorage, setCartStorage } = useContext(StorageContext);
  const { likedProduct, setLikedProduct } = useContext(WishlistContext);
  const addLocalStorage = (
    size,
    photo,
    title,
    color,
    id,
    price,
    discount,
    discounted_price
  ) => {
    const data = {
      quantity: 1,
      selectSize: `${size.height} sm × ${size.width} sm × ${size.length} sm`,
      product_photo: `${photo}`,
      product_title: `${title}`,
      color_id: `${color.id}`,
      color_title: `${color.title}`,
      color_hex_code: `${color.hex_code}`,
      productId: `${id}`,
      productPrice: `${price}`,
      discount: `${discount}`,
      discounted_price: `${discounted_price}`,
    };
    if (cartStorage.length) {
      const updateCart = cartStorage.filter(
        (item) =>
          item.productId === data.productId &&
          item.color_id === data.color_id &&
          item.selectSize === data.selectSize
      );
      if (updateCart.length > 0) {
        setCartStorage(cartStorage);
      } else {
        setCartStorage([...cartStorage, data]);
      }
    } else {
      setCartStorage([...cartStorage, data]);
    }
  };
  const handelWishlistStorage = (item) => {
    const findID = likedProduct.find((i) => i.id === item.id);
    const filterItem = likedProduct.filter((i) => i.id !== item.id);
    if (findID) {
      setLikedProduct(filterItem);
    } else {
      setLikedProduct([...likedProduct, item]);
    }
  };
  return (
    <div className="best-sellers">
      <h5>May like you</h5>
      <section className="products">
        {lastProducts.map((item) => {
          const {
            id,
            title,
            category,
            slug,
            photo,
            price,
            size,
            color,
            discount,
            discounted_price,
          } = item;
          const sizeProduct = size.slice(0, 1);
          const findID = likedProduct.find((i) => i.id == id);
          return (
            <div key={id} className="product-hover">
              <Fade>
                <div className="product">
                  <span
                    className={
                      discount
                        ? "stock-price active-stock-price"
                        : "stock-price"
                    }
                  >
                    <img src={stock} alt="" />
                    <p>{discount}%</p>
                  </span>
                  <span
                    onClick={() => handelWishlistStorage(item)}
                    className="product-heart-icon"
                  >
                    <IoHeartOutline className="like_outline" />
                    <IoHeart
                      className={findID ? "like_icon open_heart" : "like_icon"}
                    />
                  </span>
                  <span className="product-stock-icon">
                    <img src={stock} alt="" />
                  </span>
                  <Link to={`/product_card/${slug}`} className="product-photo">
                    <img src={photoUrl(photo)} alt="" />
                  </Link>
                  <h6>{title}</h6>
                  <p>{category.title}</p>
                  <h6 className="price">
                    {price}$
                    <p
                      className={
                        discount
                          ? "active-discounted-price  discounted-price"
                          : " discounted-price"
                      }
                    >
                      {discounted_price}$
                    </p>
                  </h6>
                  <div className="product-size">
                    <h6>Size</h6>
                    {sizeProduct.map((s) => (
                      <div key={s.id} className="size-item">
                        <div>
                          width:
                          <br />
                          <span>{s.width} sm</span>
                        </div>
                        <span className="x-size">×</span>
                        <div>
                          height:
                          <br />
                          <span>{s.height} sm</span>
                        </div>
                        <span className="x-size">×</span>
                        <div>
                          length:
                          <br />
                          <span>{s.length} sm</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() =>
                      addLocalStorage(
                        size[0],
                        photo,
                        title,
                        color[0],
                        id,
                        price,
                        discount,
                        discounted_price
                      )
                    }
                    className="add-to-cart"
                  >
                    <p>Add to cart</p>
                  </button>
                </div>
              </Fade>
            </div>
          );
        })}
      </section>
    </div>
  );
}
