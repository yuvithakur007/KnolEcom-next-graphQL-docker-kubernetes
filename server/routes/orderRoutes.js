const express = require('express');
const router = express.Router();
const {getAllOrders,placeOrder} = require('../controllers/orderController');

router.post('/place-order', placeOrder);
router.get('/', getAllOrders);

module.exports = router;