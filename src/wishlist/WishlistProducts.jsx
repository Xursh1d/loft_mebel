import React from "react";
import "./style.css";

export default function WishlistProducts({ wishlist }) {
  return (
    <div onClick={(e)=>e.stopPropagation()} className={wishlist ? "wishlist_table open_wishlist":"wishlist_table" }>
      <h1>Wishlist</h1>
      <ul className="wishlist_products">
        <li>Product</li>
      </ul>
    </div>
  );
}
