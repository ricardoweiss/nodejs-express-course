
const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();


router.get('/add-product', adminController.getAddProductPage);

router.post('/add-product', adminController.postAddProductPage);

router.get('/products', adminController.getAdminProducts)

module.exports = router;
