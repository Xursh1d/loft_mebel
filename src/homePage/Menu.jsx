import React from "react";
import "./Home.css";
import phone from "../LoftMebelPhoto/phone-white.svg";
import delivery from "../LoftMebelPhoto/delivery-icon-white.svg";
import "typeface-roboto";
import MenuColumn1 from "./menuComponents/MenuColumn1";
import MenuColumn2 from "./menuComponents/MenuColumn2";
export default function Menu() {
  return (
    <div className="menu">
      <div className="menu-container">
        <MenuColumn1 />
        <MenuColumn2 phone={phone} delivery={delivery} />
      </div>
    </div>
  );
}
