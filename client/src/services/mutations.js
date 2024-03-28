import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
  

export const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
        userName
        sessionToken
        message
    }
  }
`;
export const ADD_PRODUCT_TO_CART = gql`
  mutation AddProductToCart($productId: ID!) {
    addProductToCart(productId: $productId) {
        success
        message
    }
  }
`;

export const REMOVE_PRODUCT_FROM_CART = gql`
  mutation RemoveProductFromCart($productId: ID!) {
    removeProductFromCart(productId: $productId) {
        success
        message
    }
  }
`; 

export const ADD_PRODUCTS_TO_ORDER = gql`
  mutation AddProductsToOrder($productIds: [ID]!, $totalPrice: Float!) {
    addProductsToOrder(productIds: $productIds, totalPrice: $totalPrice) {
        success
        message
    }
  }
`;