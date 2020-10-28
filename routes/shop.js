
const express = require('express');

const shopControllers = require('../controllers/shop');

const router = express.Router();

;
router.get('/products', shopControllers.getProducts);
router.get('/', shopControllers.getIndexPage);
router.get('/products/:productId', shopControllers.getProduct)
/*
router.post('/cart', shopControllers.postCart);
router.get('/cart', shopControllers.getCartPage);
router.post('/cart-delete-item', shopControllers.postDeleteCartItem);
router.post('/create-order', shopControllers.postOrder);
router.get('/orders', shopControllers.getOrdersPage);*/



module.exports = router;
