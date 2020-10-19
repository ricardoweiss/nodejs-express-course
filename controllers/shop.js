const Product = require('../models/product')
const Cart = require('../models/cart')

const fetchProducts = (req, res, path, pageTitle) => {
    Product.fetchAll()
        .then(([rows]) => {

        })
        .catch(e => console.log(e))
}
exports.getIndexPage = (req, res) => {
    Product.findAll()
        .then(products => {
            res.render(`shop/index`, {
                prods: products,
                pageTitle: "Shop",
                path: `/index`});
        })
}

exports.getProducts = (req, res) => {
    Product.findAll()
        .then(products => {
            res.render(`shop/product-list`, {
                prods: products,
                pageTitle: "Products",
                path: `/product-list`});
        })
}

exports.getProduct = (req, res) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/')
            }
            res.render('shop/product-detail', {
                product: product,
                pageTitle: 'Product Detail',
                path: '/products'
            })
        })
        .catch(e => console.log(e))
}

exports.getCartPage = (req, res, next) => {
    Cart.getProductsFromCart(cartProducts => {
        Product.fetchAll(products => {
            const cart = []
            for (product of products) {
                const cartProductData = cartProducts.find(prod => prod.id === product.id)
                if (cartProductData) {
                    cart.push({ productData: product, qty: cartProductData.qty })
                }
            }
            console.log(cart)
            res.render('shop/cart', {pageTitle: "Cart",
                path: '/cart',
                prods: cart})
        })
    })


}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId
    Product.findById(prodId, prod => {
        Cart.addProduct(prodId, prod.price)
    })
    res.redirect('/cart')
}

exports.postDeleteCartItem = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price)
        res.redirect('/cart')
    })
}

exports.getOrdersPage = (req, res, next) => {
    res.render('shop/orders', {pageTitle: "Orders",
        path: '/orders'})
}
exports.getCheckoutPage = (req, res, next) => {
    res.render('shop/checkout', {pageTitle: "Checkout",
        path: '/checkout'})
}