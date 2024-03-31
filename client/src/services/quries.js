import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts($category: String, $sort: String) {
    getAllProducts(category: $category, sort: $sort) {
        id
        name
        price
        description
        avgRating
        image
        category
    }
  }
`;

export const GET_ALL_PRODUCT_IDS = gql`
  query GetProductIds {
    getAllProductIds
  }
`;



export const GET_SPECIFIED_PRODUCT = gql`
  query GetSpecifiedProduct($productId: ID!) {
    getProductById(productId: $productId) {
        name
        price
        description
        avgRating
        image
        category
        id
    }
  }
`;

export const Get_Product_By_Id = gql`
  query GetProductById($productId: ID!) {
    getProductById(productId: $productId) {
        name
        price
        description
        rating
        image
        category
        id
    }
  }
`;


export const GET_USER_CART = gql`
  query GetUserCart($email : String!) {
    getUserCart (email: $email) 
  }
`;

export const GET_ALL_ORDER = gql`
  query GetAllOrders($email : String!) {
    getAllOrders (email: $email) 
  }
`;
