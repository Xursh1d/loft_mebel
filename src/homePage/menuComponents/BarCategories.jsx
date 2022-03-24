import React, { useRef, useState } from "react";
import Vector from "../../LoftMebelPhoto/Vector.png";
import { FaAngleDown } from "react-icons/fa";
import { photoUrl } from "../../helpers/photo_url_fixer";
import { Link } from "react-router-dom";
export default function BarCategories({ categories }) {
  const [barCategory, setBarCategory] = useState([]);
  const handelOpenChildCategory = (e, item) => {
    e.stopPropagation();
    setBarCategory([]);
    if (barCategory.id === item.id) {
      setBarCategory([]);
    } else setBarCategory(item);
  };

  return (
    <div>
      <ul className="barsCategories">
        {categories.map((category) => {
          if (category.children.length > 0) {
            return (
              <li key={category.id}>
                <div
                  onClick={(e) => handelOpenChildCategory(e, category)}
                  className={
                    barCategory.id === category.id
                      ? "icon-down for-downpage"
                      : "for-downpage"
                  }
                >
                  <FaAngleDown className="down_icon_bar" />
                </div>
                <div className="menu-category">
                  <Link to={`/category/${category.slug}`}>
                    <img src={photoUrl(category.icon)} alt="" />
                    <p> {category.title}</p>
                  </Link>
                </div>
                <ul
                  className={
                    barCategory.id === category.id
                      ? "child-bar-categories  open-child"
                      : "child-bar-categories"
                  }
                >
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
