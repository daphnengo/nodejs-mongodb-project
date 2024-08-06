const express = require('express');
const adminControllers = require('../controllers/admin');

const router = express.Router();

router.get('/add-product', adminControllers.getAddProduct);
router.post('/add-product', adminControllers.postAddProduct);

// router.get('/manage-products', adminControllers.getManageProducts);
// router.get('/edit-product/:productId', adminControllers.getEditProduct);
// router.post('/edit-product/', adminControllers.postEditProduct);
// router.post('/delete-product/', adminControllers.postDeleteProduct);

module.exports = router;
