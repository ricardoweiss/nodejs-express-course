const Product = require('../models/product')


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
/*
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

    /!*let fetchedCart;
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
        .catch(e => console.log(e))*!/
}





exports.getCartPage = (req, res, next) => {
    req.user.getCart()
        .then(products => {
            res.render('shop/cart', {pageTitle: "Cart",
                path: '/cart',
                prods: products})
        })
        .catch(e => console.log(e))

}



exports.postDeleteCartItem = (req, res, next) => {
    const prodId = req.body.productId;
    req.user.deleteCartProduct(prodId)
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
    req.user.addOrder()
        .then(result => {
            res.redirect('/orders')
        })
        .catch(e => console.log(e))
}

*/
