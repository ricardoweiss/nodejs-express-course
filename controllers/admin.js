const Product = require('../models/product')

exports.getAddProductPage = (req, res, next) => {
    res.render('admin/add-product', {pageTitle: "Add Product",
        path: 'admin/add-product'})
}

exports.postAddProductPage = (req, res, next) => {
    const { title, imageUrl, price, description } = req.body
    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect('/');
}

exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: "Admin Products",
            path: '/admin/products'});
    })
}