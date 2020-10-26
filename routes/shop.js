
const express = require('express');

const shopControllers = require('../controllers/shop');

const router = express.Router();

router.get('/products/:productId', shopControllers.getProduct);
router.get('/products', shopControllers.getProducts);
router.get('/', shopControllers.getIndexPage);
/*

router.get('/cart', shopControllers.getCartPage);
router.post('/cart', shopControllers.postCart);
router.post('/cart-delete-item', shopControllers.postDeleteCartItem);
router.get('/orders', shopControllers.getOrdersPage);
router.post('/create-order', shopControllers.postOrder);


*/
module.exports = router;
