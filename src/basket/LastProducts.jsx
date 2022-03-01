import React from "react";
import "../homePage/Home.css";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import { photoUrl } from "../helpers/photo_url_fixer";
import stock from "../LoftMebelPhoto/stock.svg";
import heart from "../LoftMebelPhoto/heart.svg";

export default function LastProducts({ lastProducts }) {
  return (
    <div className="best-sellers">
       <h5>May like you</h5>
      <section className="products">
        {lastProducts.map((item) => {
          const {
            id,
            title,
            category,
            slug,
            photo,
            price,
            size,
            discount,
            discounted_price,
          } = item;
          const sizeProduct = size.slice(0, 1);
          return (
            <Link
              key={id}
              to={`/product_card/${slug}`}
              className="product-hover"
            >
              <Fade>
                <div className="product">
                  <span
                    className={
                      discount
                        ? "stock-price active-stock-price"
                        : "stock-price"
                    }
                  >
                    <img src={stock} alt="" />
                    <p>{discount}%</p>
                  </span>
                  <span className="product-heart-icon">
                    <img src={heart} alt="" />
                  </span>
                  <span className="product-stock-icon">
                    <img src={stock} alt="" />
                  </span>
                  <div className="product-photo">
                    <img src={photoUrl(photo)} alt="" />
                  </div>
                  <h6>{title}</h6>
                  <p>{category.title}</p>
                  <h6 className="price">
                    {price}$
                    <p
                      className={
                        discount
                          ? "active-discounted-price  discounted-price"
                          : " discounted-price"
                      }
                    >
                      {discounted_price}$
                    </p>
                  </h6>
                  <div className="product-size">
                    <h6>Size</h6>
                    {sizeProduct.map((s) => (
                      <div key={s.id} className="size-item">
                        <div>
                          width:
                          <br />
                          <span>{s.width} sm</span>
                        </div>
                        <span className="x-size">×</span>
                        <div>
                          height:
                          <br />
                          <span>{s.height} sm</span>
                        </div>
                        <span className="x-size">×</span>
                        <div>
                          length:
                          <br />
                          <span>{s.length} sm</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link to="/basket">
                    <button className="add-to-cart">
                      <p>Add to cart</p>
                    </button>
                  </Link>
                </div>
              </Fade>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
