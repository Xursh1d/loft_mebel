import stock from "../LoftMebelPhoto/stock.svg";
import cancel from "../LoftMebelPhoto/cancel.png";
import { photoUrl } from "../helpers/photo_url_fixer";

export default function CartProduct({ item, removeLocalStorage }) {
  const productprice = item.quantity * item.productPrice;
  const {
    productId,
    quantity,
    selectSize,
    color_id,
    color_title,
    color_hex_code,
    product_photo,
    product_title,
    discount,
    discounted_price,
  } = item;
  return (
        <li className="cart-product">
          <div className="cart_product_photo">
            <img src={photoUrl(product_photo)} alt="" />
          </div>
          <div className="cart_product_items">
            <div className="product_name_price">
              <h5 className="cart_product_name">{product_title}</h5>
              <div className="cart_product_price">
                <span
                  className={
                    discount === "null"
                      ? "discount_null"
                      : "cart_product_discount"
                  }
                >
                  <img src={stock} />
                  <p className="discount_prosent">{discount} %</p>
                </span>
                <span className="mobile_qty">{quantity}</span>
                <p
                  className={
                    discount === "null" ? "discount_null" : "old_price"
                  }
                >
                  {discounted_price} $
                </p>
                <h5 className="new_price">{productprice} $</h5>
              </div>
            </div>
            <div className="product_child_items">
              <p>
                <span>Color :</span>
                {color_title}
                <div
                  style={{ backgroundColor: color_hex_code }}
                  className="item_color"
                ></div>
              </p>
              <p className="none_qty">
                <span>quantity :</span> {quantity}
              </p>
              <p>
                <span>Size(W×H×L) :</span>
                {selectSize}
              </p>
            </div>
          </div>
          <button
            onClick={() => removeLocalStorage(productId, color_id, selectSize)}
            className="cart_product_remove"
          >
            <img src={cancel} alt="" />
          </button>
        </li>
  );
}
