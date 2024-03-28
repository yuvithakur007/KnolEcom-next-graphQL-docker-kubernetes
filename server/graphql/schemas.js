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
    # quantity: Int!
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
    getAllProducts(category: String, sort: String): [Product]
    getAllOrders(userId: ID!): [String]
    getUserCart(userId: ID!): [String]
    getUserDetails(userId:ID!): String
  }

   type Mutation {
    login(email: String!, password: String!): LoginPayload
    addToCart(productId: ID!, userId: ID!): String!
    deleteFromCart(productId: ID!, , userId: ID!): String! 
    placeOrder(userId: ID!): String!
  }
`;

module.exports = typeDefs;
