const Product = require('../models/product')
const Order = require('../models/order')


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
    req.user.getCart()
        .then(cart => {
            return cart.getProducts()
        })
        .then(products => {
            res.render('shop/cart', {pageTitle: "Cart",
                path: '/cart',
                prods: products})
        })
        .catch(e => console.log(e))

}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId
    let fetchedCart;
    let newQuantity = 1
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart
            return cart.getProducts({ where: { id: prodId}})
        })
        .then(products => {
            let product;
            if (products.length > 0) {
                product = products[0]
            }

            if (product) {
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return product;
            }
            return Product.findByPk(prodId);
        })
        .then(product => {
            return fetchedCart.addProduct(product, { through: {quantity: newQuantity}})
        })
        .then(() => {
            res.redirect('/cart')
        })
        .catch(e => console.log(e))
}

exports.postDeleteCartItem = (req, res, next) => {
    const prodId = req.body.productId;
    req.user.getCart()
        .then(cart => {
            return cart.getProducts()
    })
        .then(products => {
            const product = products[0]
            return product.cartItem.destroy()
        })
        .then(result => {
            res.redirect('/cart')
        })
        .catch(e => console.log(e))
}

exports.getOrdersPage = (req, res, next) => {
    req.user.getOrders({include: ['products']})
        .then(orders => {
            res.render('shop/orders', {
                    pageTitle: "Orders",
                    path: '/orders',
                    orders: orders})

        })
        .catch(e => console.log(e))
}

exports.postOrder = (req, res) => {
    let fetchedCart;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart
            return cart.getProducts()
        })
        .then(products => {
            return req.user.createOrder()
                .then(order => {
                    return order.addProducts(
                        products.map(product => {
                            product.orderItem = { quantity: product.cartItem.quantity }
                            return product
                        }))
                })
        })
        .then(result => {
            return fetchedCart.setProducts(null)
        })
        .then(result => {
            res.redirect('/orders')
        })
        .catch(e => console.log(e))
}
