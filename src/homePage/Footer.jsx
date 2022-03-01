import React from "react";
import { Link } from "react-router-dom";
import phone from "../LoftMebelPhoto/phone.svg";
import inst from "../LoftMebelPhoto/inst.svg";
import mail from "../LoftMebelPhoto/mail.svg";
import logo from "../LoftMebelPhoto/logo.svg";

export default function Footer({ categories}) {
  return (
    <div className="footer">
      <div className="footer-navigation-LM">
        <div className="footer-categories">
          <h6>Navigation</h6>
          <div className="navigation-categories">
            <div className="navigation-item">
              {categories.slice(0, 3).map((category) => {
                return (
                  <Link to={`/category/${category.slug}`} key={category.id}>
                    {category.title}
                  </Link>
                );
              })}
            </div>
            <div className="navigation-item">
              {categories.slice(3, 6).map((category) => {
                return (
                  <Link to={`/category/${category.slug}`} key={category.id}>
                    {category.title}
                  </Link>
                );
              })}
            </div>
            <div className="navigation-item">
              {categories.slice(6, 9).map((category) => {
                return (
                  <Link to={`/category/${category.slug}`} key={category.id}>
                    {category.title}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <div className="LM">
          <img src={logo} alt="" />
          <p>Anapa, Anapa highway, 30 L/C Black Sea</p>
        </div>
      </div>
      <div className="footer-contact">
        <div className="footer-contact-item1">
          <ul className="stock">
            <li>
              <Link to={"/category/discount"}>Stock</Link>
            </li>
          </ul>
        </div>
        <div className="footer-contact-item2">
          <Link to="/tel">
            <img src={phone} alt="" />
            <span>8 (964) 89 99 119</span>
          </Link>
          <Link to="/">
            <img src={inst} alt="" />
            <span>INSTAGRAM</span>
          </Link>
          <Link to="/tel">
            <img src={mail} alt="" />
            <span>mebel_loft_anapa@mail.ru</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
