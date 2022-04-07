import React from "react";
import "./style.css";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useContext } from "react";
import { WishlistContext } from "../context/Context";
import { Link } from "react-router-dom";

export default function WishlistProducts() {
  const { wishlist, setWishlist, likedProduct, setLikedProduct } =
    useContext(WishlistContext);
  console.log(likedProduct);
  const removeFromStorage = (id) => {
    const update = likedProduct.filter((i) => i.id !== id);
    setLikedProduct(update);
  };
  return (
    <div className={wishlist ? "wishlist_table open_modal" : "wishlist_table"}>
      <section
        onClick={(e) => e.stopPropagation()}
        className={wishlist ? "modal_table open_wishlist" : "modal_table"}
      >
        <header>
          <h1>Favorites</h1>
          <MdOutlineCancelPresentation
            onClick={() => setWishlist(false)}
            className="cancel_wishlist"
          />
        </header>
        <ul className="wishlist_products">
          {likedProduct.map((item) => {
            const {
              id,
              title,
              category,
              photo,
              price,
              discount,
              slug,
              discounted_price,
            } = item;
            return (
              <li className="favorite_product">
                <Link
                  onClick={() => setWishlist(false)}
                  to={`/product_card/${slug}`}
                  className="img_product"
                >
                  <img src={photo} alt="" />
                </Link>
                <div className="product_title">
                  <h1>{title}</h1>
                  <p>{category.title}</p>
                </div>
                <div className="product_price">
                  <h5 className="price_item">{price}$</h5>
                  {discount ? (
                    <h5 className="discount_price">{discounted_price}$</h5>
                  ) : (
                    <h5></h5>
                  )}
                </div>
                <MdDelete
                  onClick={() => removeFromStorage(id)}
                  className="delete_item"
                />
              </li>
            );
          })}
        </ul>
        <div className={!likedProduct.length ? "no_result" : "none"}>
          <h1>No results found</h1>
        </div>
      </section>
    </div>
  );
}
