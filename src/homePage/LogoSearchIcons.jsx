import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import MenuColumn2 from "./menuComponents/MenuColumn2";
import phoneDark from "../LoftMebelPhoto/phone.svg";
import deliveryDark from "../LoftMebelPhoto/delivery-icon.svg";
import { StorageContext } from "../context/Context";
import {
  IoPersonOutline,
  IoPerson,
  IoCartOutline,
  IoCart,
  IoHeart,
  IoHeartOutline,
} from "react-icons/io5";
import { WishlistContext, TokensContext } from "../context/Context";

export default function LogoSearchIcons({
  active_basket_page,
  active_contact_page,
  active_wishlist_page,
}) {
  const [refreshToken, setRefreshToken] = useContext(TokensContext);
  const { cartStorage } = useContext(StorageContext);
  const { setWishlist } = useContext(WishlistContext);
  const [activeProfile, setActiveProfile] = useState(false);
  // console.log(refreshToken);
  const removeStorage = () => {
    setRefreshToken(true);
    localStorage.removeItem("refresh", "");
    localStorage.removeItem("access", "");
  };
  const changeWishlist = (e) => {
    e.stopPropagation();
    setWishlist(true);
  };
  return (
    <div className="logoSearchIcons">
      <MenuColumn2 phone={phoneDark} delivery={deliveryDark} />
      <div onClick={(e) => changeWishlist(e)} className="cart_link_heart">
        <IoHeartOutline
          className={`heart_icon_outline ${active_wishlist_page}`}
        />
        <IoHeart className="heart_icon" />
      </div>
      <Link to="/basket" className="cart_link_basket">
        <span>{cartStorage.length}</span>
        <IoCartOutline className={`cart_icon_outline ${active_basket_page}`} />
        <IoCart className="cart_icon" />
      </Link>
      {refreshToken ? (
        <Link to="/user/sign_in" className="cart_link_contact">
          <IoPersonOutline
            className={`contact_icon_outline ${active_contact_page}`}
          />
          <IoPerson className="contact_icon" />
        </Link>
      ) : (
        <div
          onClick={() => setActiveProfile(!activeProfile)}
          className="cart_link_contact"
        >
          <IoPersonOutline
            className={
              activeProfile
                ? `contact_icon_outline active_page`
                : `contact_icon_outline`
            }
          />
          <IoPerson className="contact_icon" />
          <ul
            className={
              !activeProfile ? "contact_list" : "contact_list open_menu_profile"
            }
          >
            <li className="contact_item">Profile</li>
            <li className="contact_item">My orders</li>
            <li
              onClick={() => removeStorage()}
              className="contact_item log_out"
            >
              Log out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
