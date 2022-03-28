import React, { useContext, useEffect, useState } from "react";
import { photoUrl } from "../helpers/photo_url_fixer";
import "./Card.css";
import SliderSwipe from "./SliderSwipe";
import heart from ".././LoftMebelPhoto/heart.svg";
import { FaAngleDown } from "react-icons/fa";
import StarRating from "./StarRating";
import { TiPlus } from "react-icons/ti";
import { TiMinus } from "react-icons/ti";
import Fade from "react-reveal/Fade";
import { StorageContext } from "../context/Context";

export default function EachProductCard({
  productCard,
  setChildPhoto,
  childPhoto,
  categories,
}) {
  const { cartStorage, setCartStorage } = useContext(StorageContext);
  const { height, width, length } = productCard.size[0];
  const firstSelect = `${height} sm × ${width} sm × ${length} sm`;

  const [activeCharacter, setActiveCharacter] = useState(false);
  const [activeRewivers, setActiveRewivers] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectSize, setSelectSize] = useState();
  const [productColor, setProductColor] = useState([]);
  useEffect(() => {
    setSelectSize(firstSelect);
    setProductColor(productCard.color[0]);
  }, [productCard]);

  const addLocalSorage = () => {
    const data = {
      quantity,
      selectSize,
      product_photo: `${productCard.photo}`,
      product_title: `${productCard.title}`,
      color_id: `${productColor.id}`,
      color_title: `${productColor.title}`,
      color_hex_code: `${productColor.hex_code}`,
      productId: `${productCard.id}`,
      productPrice: `${productCard.price}`,
      discount: `${productCard.discount}`,
      discounted_price: `${productCard.discounted_price}`,
    };

    if (cartStorage.length) {
      const updateCart = cartStorage.filter(
        (item) =>
          item.productId === data.productId &&
          item.color_id === data.color_id &&
          item.selectSize === data.selectSize
      );
      if (updateCart.length > 0) {
        let index = cartStorage.indexOf(updateCart[0]);
        cartStorage[index].quantity += quantity;
        setCartStorage(cartStorage);
      } else {
        setCartStorage([...cartStorage, data]);
      }
    } else {
      setCartStorage([...cartStorage, data]);
    }
  };

  useEffect(() => {
    handelClickActiveCharacter();
  }, []);

  const handelIncrement = () => {
    setQuantity(quantity + 1);
  };
  const handelDecrement = () => {
    quantity === 1 ? setQuantity(1) : setQuantity(quantity - 1);
  };

  const handelClickActiveCharacter = () => {
    setActiveRewivers(false);
    setActiveCharacter(true);
  };

  const handelClickActiveRewivers = () => {
    setActiveRewivers(true);
    setActiveCharacter(false);
  };

  const handelChangePhoto = (image) => {
    setChildPhoto(image);
  };
  const { id,category, title, color, size, description, price, characteristics } =
    productCard;

  let filterCategories = "";
  categories.forEach((element) => {
    if (element.children) {
      element.children.forEach((child) => {
        if (child.slug === category.slug) {
          return (filterCategories = `${element.slug} / ${child.slug}`);
        }
      });
    }
    if (element.slug === category.slug) {
      return (filterCategories = `${category.slug}`);
    }
  });

  return (
    <div key={id} className="product-card">
      <p className="product-adress">Home / {filterCategories}</p>
      <div className="product-card-row1">
        <div className="product-photos">
          <Fade>
            <div className="basic-photo">
              <img src={photoUrl(childPhoto)} alt="" />
            </div>
          </Fade>
          <div className="child-photos">
            <SliderSwipe
              handelChangePhoto={handelChangePhoto}
              productCard={productCard}
            />
          </div>
        </div>
        <div className="about-product">
          <div className="star-icon">
            <StarRating />
          </div>
          <h1 className="product-title">{title}</h1>
          <p className="product-category">{category.title}</p>
          <div className="buy-product-row">
            <h1>{price}$</h1>
            <button
              onClick={() => addLocalSorage()}
              className="product-buy-botton"
            >
              Add to cart
            </button>
            <div className="add-to-desired">
              <img src={heart} alt="" />
              <p>Add to Desired</p>
            </div>
          </div>
          <div className="color-size">
            <div className="product-color">
              <p>Color</p>
              <div className="color">
                <ul className="change_color">
                  {color.map((c) => (
                    <li key={c.id} onClick={() => setProductColor(c)}>
                      <div style={{ backgroundColor: c.hex_code }}></div>
                      {c.title}
                    </li>
                  ))}
                </ul>
                <span style={{ backgroundColor: productColor.hex_code }}></span>
                <div className="down-icon">
                  <FaAngleDown className="down-icon-svg" />
                </div>
              </div>
            </div>
            <div className="quantity">
              <p>Quantity</p>
              <div className="number">
                <div onClick={() => handelDecrement()}>
                  <TiMinus className="quantity-minus" />
                </div>
                <span>{quantity}</span>
                <div onClick={() => handelIncrement()}>
                  <TiPlus className="quantity-plus" />
                </div>
              </div>
            </div>
            <div className="product-sizes">
              <p>Size (L × W × H)</p>
              <div className="size-product">
                <FaAngleDown className="angele-down" />
                <select
                  value={selectSize}
                  onChange={(e) => setSelectSize(e.target.value)}
                >
                  {size.map((siz) => {
                    return (
                      <option
                        key={siz.id}
                        value={`${siz.height} sm × ${siz.width} sm × ${siz.length} sm`}
                      >
                        {siz.height} sm × {siz.width} sm × {siz.length} sm
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="description">
            <p>Description</p>
            <p className="scrolling-text">{description}</p>
          </div>
        </div>
      </div>
      <div className="characteristics">
        <div className="characteristics-title">
          <h6
            className={activeCharacter ? "active-character" : "character"}
            onClick={() => handelClickActiveCharacter()}
          >
            Characteristic
            <span
              className={activeCharacter ? "active-character-span" : ""}
            ></span>
          </h6>
          <h6
            className={activeRewivers ? "active-character" : "character"}
            onClick={() => handelClickActiveRewivers()}
          >
            Reviews
            <span
              className={activeRewivers ? "active-character-span" : ""}
            ></span>
          </h6>
        </div>
        <div className="product-object">
          <ul className="characteristics-items">
            {characteristics.map((int) => {
              return (
                <li key={int.id}>
                  <p className="character-key">{int.key}</p>
                  <span></span>
                  <p className="character-value">{int.value}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
