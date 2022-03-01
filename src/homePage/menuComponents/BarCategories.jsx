import React from "react";
import Vector from "../../LoftMebelPhoto/Vector.png";
import { FaAngleDown } from "react-icons/fa";
import { photoUrl } from "../../helpers/photo_url_fixer";
import { Link } from "react-router-dom";
export default function BarCategories({ categories, getCategoryId }) {
  return (
    <div>
      <ul className="barsCategories">
        {categories.map((category) => {
          if (category.children.length > 0) {
            return (
              <li key={category.id}>  
                <div className="for-downpage">
                  <FaAngleDown />
                </div>
                <div className="menu-category">
                  <Link to={`/category/${category.slug}`}>
                    <img src={photoUrl(category.icon)} alt="" />
                    <p> {category.title}</p>
                  </Link>
                </div>
                <ul className="child-bar-categories">
                  {category.children.map((child) => {
                    return (
                      <Link to={`/category/${child.slug}`} key={child.id}>
                        <li className="child-bar-element">{child.title}</li>
                      </Link>
                    );
                  })}
                </ul>
              </li>
            );
          } else {
            return (
              <li key={category.id}>
                <div className="menu-category">
                  <Link to={`/category/${category.slug}`}>
                    <img src={photoUrl(category.icon)} alt="" />
                    <p>{category.title}</p>
                  </Link>
                </div>
              </li>
            );
          }
        })}
        <li>
          <Link className="barStock" to="/category/discount">
            <img className="vector" src={Vector} alt="" />
            <p>Stock</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}
