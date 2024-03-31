import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/details.module.css";
import { useDarkMode } from "../context/DarkModeContext";
import client from "../src/apollo-client.js";
import { useMutation } from "@apollo/client";
import { ADD_TO_CART } from "@/src/services/mutations";
import { GET_SPECIFIED_PRODUCT } from "../src/services/quries.js";

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const { state } = useDarkMode();
  const [addToCart] = useMutation(ADD_TO_CART);


  useEffect(() => {
    console.log("Product ID:", id);
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (id) => {
    const productId = id;
    try {
      const { data } = await client.query({
        query: GET_SPECIFIED_PRODUCT,
        variables: { productId },
      });

      const product = data.getProductById;
      setProduct(product)
    } catch (error) {
      console.error("Error fetching specified product:", error);
      return { props: { product: null } };
    }
  };

  const handleClick = async (e) => {
    console.log("Product ID:", id);

    e.preventDefault();
    const email = localStorage.getItem("email");

    if (localStorage.getItem("email")) {
      try {
        const { data } = await addToCart({
          variables: {
            productId:id,
            email,
          },
        });

        const mssg = data.addToCart;
        if (mssg === "Added successfully!") {
          alert(mssg);
          window.location.reload();
        } else {
          throw new Error("Failed to add item to cart");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while adding item to cart");
      }
    } else {
      if (window.confirm("Please Login to add to cart")) {
        window.location.href = "/login";
      }
    }
    return;
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
              <p className={styles.productDetailsDescription}>
                {product.description}
              </p>
              <p className={styles.productDetailsCategory}>
                Category: {product.category}
              </p>
              <div className={styles.detailsRating}>
                <span>Rating: ★{product.avgRating}</span>
              </div>
              <p className={styles.productDetailsPrice}>
                Price: ${product.price}
              </p>
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

// import React, { useState, useEffect } from "react";
// import styles from "../styles/details.module.css";
// import { useDarkMode } from "../context/DarkModeContext";

// import { useMutation } from '@apollo/client';
// import { ADD_TO_CART } from '@/src/services/mutations';

// const ProductDetails = ({ product, productId }) => {
//   const { state } = useDarkMode();

//   const [addToCart] = useMutation(ADD_TO_CART);

//   const handleClick = async (e) => {
//     console.log("Product ID:", productId);

//     e.preventDefault();
//     const email = localStorage.getItem("email");

//     if (localStorage.getItem('email')) {
//       try {
//         const { data } = await addToCart({
//           variables: {
//             productId,
//             email
//           },
//         });

//         const mssg = data.addToCart;
//         if (mssg === "Added successfully!") {
//           alert(mssg);
//         } else {
//           throw new Error('Failed to add item to cart');
//         }
//       } catch (error) {
//         console.error(error);
//         alert('An error occurred while adding item to cart');
//       }
//     } else {
//       if (window.confirm("Please Login to add to cart")) {
//         window.location.href = '/login';
//       }
//     }
//   };

//   return (
//     <div className={state.darkMode ? styles.darkMode : styles.lightMode}>

//       <div className={styles.productDetailsContainer}>
//         {product && (
//           <div className={styles.productDetails}>
//             <div className={styles.productDetailsImage}>
//               <img src={product.image} alt={product.name} />
//             </div>
//             <div className={styles.productInfo}>
//               <h2 className={styles.productDetailsName}>{product.name}</h2>
//               <p className={styles.productDetailsDescription}>{product.description}</p>
//               <p className={styles.productDetailsCategory}>Category: {product.category}</p>
//               <div className={styles.detailsRating}>
//                 <span>Rating: ★{product.avgRating}</span>
//               </div>
//               <p className={styles.productDetailsPrice}>Price: ${product.price}</p>
//               <div className={styles.productDetailsActions}>
//                 <button className={styles.addCart} onClick={handleClick}>
//                   Add to cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;
