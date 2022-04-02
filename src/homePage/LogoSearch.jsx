import React from "react";
import "./Home.css";
import Input from "./Input";
import Logo from "../LoftMebelPhoto/LOGO.png";
import { Link } from "react-router-dom";
import menuIcon from "../LoftMebelPhoto/menu-icon.svg";
import LogoSearchIcons from "./LogoSearchIcons";

export default function LogoSearch({
  setMenuBar,
  active_basket_page,
  active_wishlist_page,
  active_contact_page,
  setChangeSearch,
  search
}) {
  return (
    <div className="logoSearch">
      <div onClick={(e) => e.stopPropagation()} className="menu-icon-border">
        <img
          onClick={() => {
            setMenuBar(true);
          }}
          className="menu-icon"
          src={menuIcon}
          alt=""
        />
      </div>
      <Link to="/">
        <img className="logo" src={Logo} />
      </Link>
      <Input
        setChangeSearch={setChangeSearch}
        search={search}
        style={"inputStyle"}
        type={"text"}
        palceholder={"Search"}
      />
      <LogoSearchIcons
        active_contact_page={active_contact_page}
        active_basket_page={active_basket_page}
        active_wishlist_page={active_wishlist_page}
      />
    </div>
  );
}
