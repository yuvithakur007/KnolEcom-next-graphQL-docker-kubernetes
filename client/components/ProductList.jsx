import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useDarkMode } from "@/context/DarkModeContext";
// import axios from "axios";
import styles from "../styles/products.module.css";
import client from "../src/apollo-client";
import { GET_ALL_PRODUCTS } from "../src/services/quries";

const ProductList = (props) => {
  const { state } = useDarkMode();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { search, category, sort } = props;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await client.query({
          query: GET_ALL_PRODUCTS,
          variables: { category, sort },
        });
        setProducts(data.getAllProducts);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, [category, sort]);

  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      const productNameIncludesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const descriptionIncludesSearch = product.description
        .toLowerCase()
        .includes(search.toLowerCase());
      return productNameIncludesSearch || descriptionIncludesSearch;
    });
    setFilteredProducts(filteredProducts);
  }, [search, products]);

  return (
    <div className={state.darkMode ? styles.darkMode : styles.lightMode}>
      <div className={styles.productList}>
        {filteredProducts.map(
          (
            product,
            index // Added index parameter
          ) => (
            <div className={styles.individualProductBox} key={index}>
              {" "}
              <ProductCard
                image={product.image}
                name={product.name}
                avgRating={product.avgRating}
                price={product.price}
                id={product.id}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProductList;
