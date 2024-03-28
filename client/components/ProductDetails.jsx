import React, { useState, useEffect } from "react";
import styles from "../styles/details.module.css";
import { useDarkMode } from "../context/DarkModeContext";


const ProductDetails = ({ product }) => {
  const { state } = useDarkMode();

  const handleClick = async (e) => {
    e.preventDefault();
  
    if (localStorage.getItem('token')) {
      try {
        const response = await fetch("http://localhost:3030/api/carts/additem", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({ id: product._id }),
        });
  
        if (response.ok) {
          const data = await response.json();
          alert(data.message);
        } else {
          throw new Error('Failed to add item to cart');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while adding item to cart');
      }
    } else {
      if (window.confirm("Please Login to add to cart")) {
        window.location.href = '/login';
      }
    }
  };

  return (
    <div className={state.darkMode ? styles.darkMode : styles.lightMode}>
  
      <div className={styles.productDetailsContainer}>
        {product && (
          <div className={styles.productDetails}>
            <div className={styles.productDetailsImage}>
              <img src={product.image} alt={product.name} />
            </div>
            <div className={styles.productInfo}>
              <h2 className={styles.productDetailsName}>{product.name}</h2>
              <p className={styles.productDetailsDescription}>{product.description}</p>
              <p className={styles.productDetailsCategory}>Category: {product.category}</p>
              <div className={styles.detailsRating}>
                <span>Rating: ★{product.avgRating}</span>
              </div>
              <p className={styles.productDetailsPrice}>Price: ${product.price}</p>
              <div className={styles.productDetailsActions}>
                <button className={styles.addCart} onClick={handleClick}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );  
};

export default ProductDetails;
