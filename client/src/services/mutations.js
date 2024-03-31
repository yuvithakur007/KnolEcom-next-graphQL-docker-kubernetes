import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        email
        cart
        orders
      }
      token
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation AddToCart($email: String!,$productId: ID!) {
    addToCart(email: $email,productId: $productId) 
  }
`;

export const DELETE_FROM_CART = gql`
  mutation DeleteFromCart($email: String!,$productId: ID!) {
    deleteFromCart(email: $email,productId: $productId) 
  }
`; 

export const PLACE_ORDER = gql`
  mutation PlaceOrder($email: String!) {
    placeOrder(email: $email) 
  }
`;