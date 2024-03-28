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

// export const LOGIN = gql`
//   query Login($email: String!, $password: String!) {
//     loginUser(email: $email, password: $password) {
//         userName
//         sessionToken
//         message
//     }
//   }
// `;


// export const GET_SPECIFIED_PRODUCT = gql`
//   query GetSpecifiedProduct($productId: ID!) {
//     getProductById(productId: $productId) {
//         name
//         price
//         description
//         rating
//         image
//         category
//         id
//     }
//   }
// `;

// export const GET_CART = gql`
//   query GetCart {
//     getCart {
//         product {
//             name
//             id
//             price
//             image
//         }
//     }
//   }
// `;

// export const GET_ORDERS = gql`
//   query GetOrders {
//     getOrders {
//         id
//         totalPrice
//         products {
//             name
//             price
//             image
//         }
//     }
//   }
// `;



// export const GET_ALL_PRODUCT_IDS = gql`
//   query GetProductIds {
//     getAllProductIds
//   }
// `;

