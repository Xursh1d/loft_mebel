import React from "react";
import heart from "../LoftMebelPhoto/heart.svg";
import stock from "../LoftMebelPhoto/stock.svg";
import { photoUrl } from "../helpers/photo_url_fixer";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import { useContext } from "react";
import { StorageContext } from "../context/Context";
export default function CategoryProducts({ categoryIteam, slug }) {
  const { cartStorage, setCartStorage } = useContext(StorageContext);
  const addLocalStorage = (
    size,
    photo,
    title,
    color,
    id,
    price,
    discount,
    discounted_price
  ) => {
    const data = {
      quantity: 1,
      selectSize: `${size.height} sm × ${size.width} sm × ${size.length} sm`,
      product_photo: `${photo}`,
      product_title: `${title}`,
      color_id: `${color.id}`,
      color_title: `${color.title}`,
      color_hex_code: `${color.hex_code}`,
      productId: `${id}`,
      productPrice: `${price}`,
      discount: `${discount}`,
      discounted_price: `${discounted_price}`,
    };
    if (cartStorage.length) {
      const updateCart = cartStorage.filter(
        (item) =>
          item.productId === data.productId &&
          item.color_id === data.color_id &&
          item.selectSize === data.selectSize
      );
      if (updateCart.length > 0) {
        setCartStorage(cartStorage);
      } else {
        setCartStorage([...cartStorage, data]);
      }
    } else {
      setCartStorage([...cartStorage, data]);
    }
  };
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
              color,
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
                    <Link>
                      <button
                        onClick={() =>
                          addLocalStorage(
                            size[0],
                            photo,
                            title,
                            color[0],
                            id,
                            price,
                            discount,
                            discounted_price
                          )
                        }
                        className="add-to-cart"
                      >
                        <p>Add to cart</p>
                      </button>
                    </Link>
                  </div>
                </Fade>
              </Link>
            );
          })}
        </section>
      ) : (
        <h6 className="empty_text">No products</h6>
      )}
    </>
  );
}
