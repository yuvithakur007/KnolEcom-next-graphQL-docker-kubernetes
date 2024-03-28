const express = require('express');
const router = express.Router();

const {addToCart,getUserCart,deleteFromCart} = require('../controllers/cartController');

router.get('/', getUserCart);
router.post('/additem', addToCart);
router.delete('/delete/:id', deleteFromCart);

module.exports = router;