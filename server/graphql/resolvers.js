const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const resolvers = {
    Query: {
        getAllProducts: async (_, { category, sort }) => {
          let products;
          try {
            if (category === 'All') {
              products = await Product.find();
            } else {
              products = await Product.find({ category });
            }
    
            if (sort === 'Price: Low to High') {
              products = products.sort((a, b) => a.price - b.price);
            }
            if (sort === 'Price: High to Low') {
              products = products.sort((a, b) => b.price - a.price);
            }
            if (sort === 'Rating: Low to High') {
              products = products.sort((a, b) => a.avgRating - b.avgRating);
            }
            if (sort === 'Rating: High to Low') {
              products = products.sort((a, b) => b.avgRating - a.avgRating);
            }
    
            if (!products || products.length === 0) {
              throw new Error('No products found');
            }
    
            return products;
          } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch products');
          }
        },
    
        getProductById: async (_, { productId }) => {
          try {
            const product = await Product.findById(productId);
            if (!product) {
              throw new Error('Product not found');
            }
            return product;
          } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch product');
          }
        },

        getUserDetails: async (_, { userId }) => {
          try {
        
            let user = await User.findById(userId);
            if (!user) {
              return "User not found";
            }
            return user.email;
          } catch (error) {
            console.error("Error getting user details:", error);
            throw new Error("Internal server error");
          }
        },

        
        getAllOrders:async(_, { userId }) => { 
          try {       
            const user = await User.findById(userId);
            if (!user) {
              return "User not found";
            }
            const orders = user.orders;
            return orders;
          } catch (error) {
            console.error("Error fetching user orders:", error);
            return "Server Error";
          }
      },

      getUserCart: async (_, { userId }) => {
        try {
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        const cartItems = user.cart;
       return cartItems;
      } catch (error) {
        console.error("Error fetching user cart:", error);
         return "Server Error" ;
      }
    },
    
    },

  Mutation: { 
    login: async (_, {email,password}) =>{
      try {
        let user = await User.findOne({ email });
    
        // If user doesn't exist, create a new user
        if (!user) {
          const hashedPassword = await bcrypt.hash(password, 10);
    
          user = new User({ email, password: hashedPassword });
          await user.save();
        } else {
          // Check if the provided password matches the hashed password
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            return 'Invalid email or password';
          }
        }
    
        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        return ({
          success: true,
          message: "Login Done",
          user: user,
          token: token,
        });
      } catch (error) {
        console.error(error);
        throw new Error('Failed to Login');
      }
    },
    addToCart: async (_, { productId, userId }) => {
      const user = await User.findById(userId);

      if (!user.cart.includes(productId)) {
        user.cart.push(productId);
      }

      await user.save();
      return "Added successfully!";
    },
    deleteFromCart: async (_, { productId, userId }) => {
      const user = await User.findById(userId);
      const index = user.cart.indexOf(productId);

      if (index > -1) {
        user.cart.splice(index, 1);
      }

      await user.save();
      return "Deleted successfully!";
    },

    placeOrder: async (_, { userId }) => {
      const user = await User.findById(userId);
      user.orders.push(...user.cart);
      user.cart = [];
      await user.save();
      return "Order placed successfully!";
    },
  },
}

module.exports = resolvers ;
