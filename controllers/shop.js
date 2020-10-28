const Product = require('../models/product')
const Order = require('../models/order')


exports.getIndexPage = (req, res) => {
    Product.find()
        .then(products => {
            res.render(`shop/index`, {
                prods: products,
                pageTitle: "Shop",
                path: `/index`});
        })
        .catch(e => console.log(e))
}

exports.getProducts = (req, res) => {
    Product.find()
        .then(products => {
            res.render(`shop/product-list`, {
                prods: products,
                pageTitle: "Products",
                path: `/product-list`});
        })
        .catch(e => console.log(e))
}

exports.getProduct = (req, res) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            console.log(product)
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

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product)
        })
        .then(result => {
            res.redirect('/cart')
        })
        .catch(e => console.log(e))
}





exports.getCartPage = (req, res, next) => {
    req.user.getCart()
        .then(products => {
            res.render('shop/cart', {pageTitle: "Cart",
                path: '/cart',
                prods: products})
        })
        .catch(e => console.log(e))
    /*req.user.populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items.map(prod => {
                return {...prod.productId._doc, quantity: prod.quantity}
            })

        })
        */

}



exports.postDeleteCartItem = (req, res, next) => {
    const prodId = req.body.productId;
    req.user.deleteFromCart(prodId)
        .then(result => {
            res.redirect('/cart')
        })
}

exports.getOrdersPage = (req, res, next) => {
    req.user.getOrders()
        .then(orders => {
            res.render('shop/orders', {
                    pageTitle: "Orders",
                    path: '/orders',
                    orders: orders})

        })
        .catch(e => console.log(e))
}

exports.postOrder = (req, res) => {
    req.user.getCart()
        .then(products => {
            console.log(products)
            const order = new Order({
                user: {
                    username: req.user.username,
                    userId: req.user
                },
                products: products
            })
            return order.save()
        })
        .then(result => {
            res.redirect('/orders')
        })
        .catch(e => console.log(e))
}


