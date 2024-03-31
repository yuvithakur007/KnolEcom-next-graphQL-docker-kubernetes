const { gql } = require("graphql-tag");

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    password: String!
    cart: [String]!
    orders: [String]!
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    image: String
    price: Float!
    category: String!
    avgRating: Float
  }
  type LoginPayload{
    user: User
    token: String
  }

  type CartItem {
    productId: ID!
  }

  type Cart {
    _id: ID!
    userId: ID!
    items: [CartItem]!
  }

  type Order {
    id: ID!
    products: [Product]!
    totalPrice: Float!
  }

   type Query {
    getProductById(productId: ID!): Product
    getAllProductIds: [String]!
    getAllProducts(category: String, sort: String): [Product]
    getAllOrders(email: String!): [String]
    getUserCart(email: String!): [String]
    getUserDetails(email:String!): String
  }

   type Mutation {
    login(email: String!, password: String!): LoginPayload!
    addToCart(productId: ID!, email: String!): String!
    deleteFromCart(productId: ID!, email: String!): String! 
    placeOrder(email: String!): String!
  }
`;

module.exports = typeDefs;
