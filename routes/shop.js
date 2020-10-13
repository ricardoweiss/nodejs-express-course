const express = require('express');

const shopControllers = require('../controllers/shop');

const router = express.Router();

router.get('/', shopControllers.getIndexPage);
router.get('/cart', shopControllers.getCartPage);
router.post('/cart', shopControllers.postCart);
router.get('/orders', shopControllers.getOrdersPage);
router.get('/products', shopControllers.getProducts);
router.get('/products/:productId', shopControllers.getProduct);
router.get('/checkout', shopControllers.getCheckoutPage);

module.exports = router;