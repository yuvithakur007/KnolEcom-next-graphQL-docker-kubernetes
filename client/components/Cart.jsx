import React, { useState, useEffect } from "react";
import style from "../styles/cart.module.css";
import { useDarkMode } from "../context/DarkModeContext";
import { useMutation } from "@apollo/client";
import client from "../src/apollo-client";
import { GET_USER_CART, GET_SPECIFIED_PRODUCT } from "../src/services/quries";

import { DELETE_FROM_CART, PLACE_ORDER} from "@/src/services/mutations";

const Cart = () => {
  const { state } = useDarkMode();
  const [cartItems, setCartItems] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  const [deleteFromCart] = useMutation(DELETE_FROM_CART);
  const [placeOrder] = useMutation(PLACE_ORDER);

  useEffect(() => {
    const fetchCartItems = async () => {
      const email = localStorage.getItem("email");
      try {
        const { data } = await client.query({
          query: GET_USER_CART,
          variables: { email },
        });
        setCartItems(data.getUserCart);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    const fetchAllCartProducts = async () => {
      try {
        const productPromises = cartItems.map(fetchProduct);
        const products = await Promise.all(productPromises);
        setCartProducts(products);
      } catch (error) {
        console.error("Error fetching cart products:", error);
      }
    };

    const fetchProduct = async (productId) => {
      const { data } = await client.query({
        query: GET_SPECIFIED_PRODUCT,
        variables: { productId },
      });
      return data.getProductById;
    };

    fetchCartItems();
    fetchAllCartProducts();
  }, [cartItems]);

  const handleDeleteItem = async (itemId) => {
    const email = localStorage.getItem("email");
  
    if (localStorage.getItem("email")) {
      try {
        const { data } = await deleteFromCart({
          variables: {
            productId: itemId,
            email: email,
          },
        });
  
        const mssg = data.deleteFromCart;
        if (mssg === "Deleted successfully!") {
          alert(mssg);
         window.location.reload();
        } else {
          throw new Error("Failed to delete item from cart");
        }
      } catch (error) {
        console.error("Error deleting item from cart:", error);
      }
    }
  };
  
  const handlePlaceOrder = async () => {
    const email = localStorage.getItem("email");
  
    if (localStorage.getItem("email")) {
      try {
        const { data } = await placeOrder({
          variables: {
            email: email,
          },
        });
  
        const mssg = data.placeOrder;
        if (mssg === "Order placed successfully!") {
          alert(mssg);
          window.location.reload();
        } else {
          throw new Error("Failed to place order");
        }
      } catch (error) {
        console.error("Error placing order:", error);
      }
    }
  }
  
  return (
    <div className={state.darkMode ? style.darkMode : style.lightMode}>
      <div className={style.cartContainer}>
        <h1>Cart</h1>
        {cartProducts.length > 0 ? (
          <div className={style.cartProducts}>
            <table className={style.cartTable}>
              <thead>
                <tr className={style.cartTableHeader}>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartProducts.map((item) => (
                  <tr key={item.id} className={style.cartItem}>
                    <td style={{ paddingRight: "0rem" }}>
                      <img
                        className={style.cartItemImage}
                        src={item.image}
                        alt={item.name}
                      />
                      <br />
                      {item.name}
                    </td>
                    <td>${item.price}</td>
                    <td>
                      <button
                        className={style.cartButton}
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={style.totalAmount}>
              <p>
                Total: $
                {cartProducts.reduce(
                  (total, product) => total + product.price,
                  0
                )}
              </p>
            </div>
            <button className={style.cartButton} onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        ) : (
          <div>
            <p style={{ margin: "1.5rem" }}>No products in the cart.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
