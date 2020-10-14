
const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();


router.get('/add-product', adminController.getAddProductPage);

router.post('/add-product', adminController.postAddProductPage);

router.get('/edit-product/:productId', adminController.getEditProductPage)

router.post('/edit-product', adminController.postEditProduct)

router.post('/delete-product', adminController.postDeleteProduct)

router.get('/products', adminController.getAdminProducts)

module.exports = router;
