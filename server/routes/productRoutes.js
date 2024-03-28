const express = require('express');
const router = express.Router();

const {getAllProducts,getProduct,addProduct,getIds} = require('../controllers/productController');

router.get('/prodIds', getIds);
router.get('/api/products', getAllProducts);
router.get('/:id', getProduct);
router.post('/add', addProduct);

module.exports = router;