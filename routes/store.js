const express = require('express');
const storeController = require('../controllers/store');

const router = express.Router();

router.get('/', storeController.getProducts);
// router.get('/product-details/:productId', storeController.getProductDetails);
// router.post('/add-to-cart', storeController.postAddToCart);

// router.get('/cart', storeController.getCart);
// router.post('/cart-delete-item', storeController.postCartDeleteItem);

// router.get('/orders', storeController.getOrders);
// router.post('/create-order', storeController.postCreateOrder);

module.exports = router;
