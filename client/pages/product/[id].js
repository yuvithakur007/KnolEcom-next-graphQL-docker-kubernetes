// import ProductDetails from '@/components/ProductDetails';

// export default function ProductDetailsPage(){
//     return <ProductDetails />
// }

import ProductDetails from '../../components/ProductDetails.jsx';
import client from "../../src/apollo-client.js";
import { GET_ALL_PRODUCT_IDS, GET_SPECIFIED_PRODUCT } from "../../src/services/quries.js";

export default function ProductDetailsPage({ product, productId }) {
    return <ProductDetails product={product} productId={productId} />;
}


export async function getStaticPaths() {
  try {
      const { data } = await client.query({
          query: GET_ALL_PRODUCT_IDS,
      });

      const productIds = data.getAllProductIds;
      console.log("Product IDs:", productIds)

      const paths = productIds.map((productId) => ({
          params: { id: productId.toString() } 
      }));
      return { paths, fallback: false };
  } catch (error) {
      console.error("Error fetching product IDs:", error);
      return { paths: [], fallback: false }; 
  }
}

export async function getStaticProps({ params }) {
  const productId = params.id;
  try {
      const { data } = await client.query({
          query: GET_SPECIFIED_PRODUCT,
          variables: { productId }
      });

      const product = data.getProductById;
     return { 
        props: { 
          product,
          productId 
        } };
  } catch (error) {
      console.error("Error fetching specified product:", error);
      return { props: { product: null } }; 
  }
}
