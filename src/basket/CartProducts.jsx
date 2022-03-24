import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartProduct from "./CartProduct";

export default function CartProducts({ cartStorage, removeLocalStorage }) {
  const [allSumma, setAllSum] = useState();
  useEffect(() => {
    let allSum = 0;
    cartStorage.forEach((element) => {
      const productprice = element.quantity * element.productPrice;
      allSum += productprice;
    });
    setAllSum(allSum);
  }, [cartStorage]);
  return (
    <div className="basket-product">
      <div className="header_added_product">
        <p>Your shopping cart</p>
        <p>{cartStorage.length} items</p>
      </div>
      <ul className="shopping_cart_products">
        {cartStorage.map((item) => {
          return (
            <CartProduct item={item} removeLocalStorage={removeLocalStorage} />
          );
        })}
      </ul>
      <div className="all_price">
        <span className="total_cost">
          <p>Total cost:</p>
          <h4>{allSumma} $</h4>
        </span>
       <Link to="/my_orders">
        <button className="btn_palce_order">Place an order</button>       
       </Link>
      </div>
    </div>
  );
}
