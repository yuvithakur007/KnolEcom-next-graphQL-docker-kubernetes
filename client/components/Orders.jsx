import React, { useState, useEffect } from 'react';
import styles from "../styles/order.module.css";
import { useDarkMode } from '../context/DarkModeContext';

import client from "../src/apollo-client";
import { GET_ALL_ORDER,GET_SPECIFIED_PRODUCT} from "../src/services/quries";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
  const {state} = useDarkMode();

  useEffect(() => {
    const fetchOrderItems = async () => {
      const email = localStorage.getItem("email");   
      try {
        const { data } = await client.query({
          query: GET_ALL_ORDER,
          variables: { email },
        });
        setOrders(data.getAllOrders);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };


    const fetchProduct = async (productId) => {
      const { data } = await client.query({
        query: GET_SPECIFIED_PRODUCT,
        variables: { productId }
      });
      return data.getProductById;
    };

    const fetchAllOrderProducts = async () => {
      try {
        const productPromises = orders.map(fetchProduct);
        const products = await Promise.all(productPromises);
        setOrderProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchOrderItems();
    fetchAllOrderProducts();
  }, [orders]);

  return (
    <div className={state.darkMode ? styles.darkMode : styles.lightMode}> 
      <div className={styles.ordersContainer}> 
        <h1>Orders</h1>
        {orderProducts.length > 0 ? (
          <div className={styles.orderProducts}> 
            <table className={styles.orderTable}> 
              <thead>
                <tr className={styles.orderTableHeader}> 
                  <th>Number</th>
                  <th>Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {orderProducts.map((order, index) => (
                  <tr key={index} className={styles.orderItem}> 
                    <td>{index + 1}</td>
                    <td>{order.name}</td>
                    <td>${order.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <p style={{ margin: "1.5rem" }}>No orders available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;