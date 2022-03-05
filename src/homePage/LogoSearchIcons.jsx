import React, { useContext } from "react";
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
export default function LogoSearchIcons({
  active_basket_page,
  active_contact_page,
  active_wishlist_page,
}) {
  const { cartStorage} = useContext(StorageContext);

  return (
    <div className="logoSearchIcons">
      <MenuColumn2 phone={phoneDark} delivery={deliveryDark} />
      <Link to="/wishlist" className="cart_link_heart">
        <IoHeartOutline
          className={`heart_icon_outline ${active_wishlist_page}`}
        />
        <IoHeart className="heart_icon" />
      </Link>
      <Link to="/basket" className="cart_link_basket">
        <span>{cartStorage.length}</span>
        <IoCartOutline className={`cart_icon_outline ${active_basket_page}`} />
        <IoCart className="cart_icon" />
      </Link>
      <Link to="/user/sign_in" className="cart_link_contact">
        <IoPersonOutline
          className={`contact_icon_outline ${active_contact_page}`}
        />
        <IoPerson className="contact_icon" />
      </Link>
    </div>
  );
}
