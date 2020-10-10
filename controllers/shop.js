const Product = require('../models/product')

exports.getIndexPage = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: "Shop",
            path: '/'});
    })
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: "Products",
            path: '/products'});
    })
}

exports.getCartPage = (req, res, next) => {
    res.render('shop/cart', {pageTitle: "Cart",
        path: '/cart'})
}

exports.getOrdersPage = (req, res, next) => {
    res.render('shop/orders', {pageTitle: "Orders",
        path: '/orders'})
}
exports.getCheckoutPage = (req, res, next) => {
    res.render('shop/checkout', {pageTitle: "Checkout",
        path: '/checkout'})
}