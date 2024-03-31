const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");

const typeDefs = require("./graphql/schemas");
const resolvers = require("./graphql/resolvers");

const cors = require("cors");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());

// Apollo Server setup for GraphQL
const server = new ApolloServer({ typeDefs, resolvers });

async function startApolloServer() {
  await server
    .start()
    .then(
      console.log(`🚀 Apollo Server ready at http://localhost:4000`)
    );

  app.use(
    "/",
    cors(),
    express.json(),
    express.urlencoded({ extended: true }),
    expressMiddleware(server, {
      context: async ({ req }) => {
        return { token: req.headers.token }},
    })
  );

  // MongoDB connection
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: "test",
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    });

  // Start the server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startApolloServer();