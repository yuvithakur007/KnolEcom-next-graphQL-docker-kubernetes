const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.placeOrder = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    
    const user = await User.findById(userId);

    // Check if the cart is empty
    if (user.cart.length === 0) {
      return res.status(400).json({ message: 'cart is empty' });
    }

    // Move all items from cart to orders
    user.orders = user.orders.concat(user.cart);
    user.cart = [];

    await user.save();

    res.json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const orders = user.orders;
    res.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Server Error" });
  }
};