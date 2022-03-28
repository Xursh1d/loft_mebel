import { useRef } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./Home.css";
import { photoUrl } from "../helpers/photo_url_fixer";
import etc from "../LoftMebelPhoto/etc.png";
import Vector from "../LoftMebelPhoto/Vector.png";
import Fade from "react-reveal/Fade";
import { FaAngleDown } from "react-icons/fa";

export default function Categories({ categories }) {
  const categorySlug = useParams();
  return (
    <div>
      <ul className="categories">
        {categories.map((category) => {
          if (category.children.length > 0) {
            return (
              <Fade key={category.id}>
                <div className="category-title">
                  <Link
                    to={`/category/${category.slug}`}
                    className={
                      categorySlug.slug === category.slug
                        ? "category active_category"
                        : "category"
                    }
                  >
                    <li>
                      <div className="mobile-category-icon">
                        <img
                          style={{ marginRight: 10 }}
                          src={photoUrl(category.icon)}
                        />
                      </div>
                      <p className="parent-category">
                        {category.title} <FaAngleDown className="down-icon" />
                      </p>
                    </li>
                  </Link>
                  <ul className="child-categories">
                    {category.children.map((child) => {
                      return (
                        <Link key={child.id} to={`/category/${child.slug}`}>
                          <li className="child-element">{child.title}</li>
                        </Link>
                      );
                    })}
                  </ul>
                </div>
              </Fade>
            );
          } else {
            return (
              <Fade key={category.id}>
                <div className="category-title">
                  <Link
                    className={
                      categorySlug.slug === category.slug
                        ? "category active_category"
                        : "category"
                    }
                    to={`/category/${category.slug}`}
                  >
                    <li key={category.id}>
                      <div className="mobile-category-icon">
                        <img
                          style={{ marginRight: 10 }}
                          src={photoUrl(category.icon)}
                          alt=""
                        />
                      </div>
                      <p>{category.title}</p>
                    </li>
                  </Link>
                </div>
              </Fade>
            );
          }
        })}
        <Fade>
          <Link className="mobile-stock" to="/category/discount">
            <li
              className={
                categorySlug.slug === "discount"
                  ? "stock active_category"
                  : "stock"
              }
            >
              <div className="mobile-category-icon">
                <img className="vector" src={Vector} alt="" />
              </div>
              <p>Stock</p>
            </li>
          </Link>
        </Fade>
        <li className="etc">
          <ul className="etcMenu">
            {categories.map((category) => {
              if (category.children.length > 0) {
                return (
                  <div
                    key={category.id}
                    className={
                      categorySlug.slug === category.slug
                        ? "etc-item active_category"
                        : "etc-item"
                    }
                  >
                    <Link to={`/category/${category.slug}`}>
                      <li>
                        <div className="mobile-category-icon">
                          <img
                            style={{ marginRight: 10 }}
                            src={photoUrl(category.icon)}
                          />
                        </div>
                        <p className="parent-category">
                          {category.title} <FaAngleDown className="down-icon" />
                        </p>
                      </li>
                    </Link>
                    <ul className="child-etc-categories">
                      {category.children.map((child) => {
                        return (
                          <Link key={child.id} to={`/category/${child.slug}`}>
                            <li className="child-etc-element">{child.title}</li>
                          </Link>
                        );
                      })}
                    </ul>
                  </div>
                );
              } else {
                return (
                  <div
                    key={category.id}
                    className={
                      categorySlug.slug === category.slug
                        ? "etc-item active_category"
                        : "etc-item"
                    }
                  >
                    <Link to={`/category/${category.slug}`}>
                      <li>
                        <div className="mobile-category-icon">
                          <img
                            style={{ marginRight: 10 }}
                            src={photoUrl(category.icon)}
                            alt=""
                          />
                        </div>
                        <p>{category.title}</p>
                      </li>
                    </Link>
                  </div>
                );
              }
            })}
          </ul>
          <img src={etc} alt="" />
        </li>
      </ul>
    </div>
  );
}
