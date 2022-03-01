import React from "react";
import heart from "../LoftMebelPhoto/heart.svg";
import stock from "../LoftMebelPhoto/stock.svg";
import { photoUrl } from "../helpers/photo_url_fixer";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
export default function CategoryProducts({categoryIteam,slug}) {
  return (
    <>
      {categoryIteam.length ? (
      <section
        className={slug === "discount" ? "products" : "products filter_table"}
      >
        {categoryIteam.map((item) => {
          const {
            id,
            title,
            category,
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
              to={`/product_card/${id}`}
              className="product-hover filter_category_product"
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
      ) : (<h6 className="empty_text">No products</h6>)
    }
    </>
  );
}
