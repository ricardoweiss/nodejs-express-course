const Product = require('../models/product')
const Cart = require('../models/cart')

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

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, p => {
        res.render('shop/product-detail', {
            product: p,
            pageTitle: 'Product Detail',
            path: '/products'
        })
    })
}

exports.getCartPage = (req, res, next) => {
    res.render('shop/cart', {pageTitle: "Cart",
        path: '/cart'})
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId
    Product.findById(prodId, prod => {
        Cart.addProduct(prodId, prod.price)
    })
    res.redirect('/cart')
}

exports.getOrdersPage = (req, res, next) => {
    res.render('shop/orders', {pageTitle: "Orders",
        path: '/orders'})
}
exports.getCheckoutPage = (req, res, next) => {
    res.render('shop/checkout', {pageTitle: "Checkout",
        path: '/checkout'})
}