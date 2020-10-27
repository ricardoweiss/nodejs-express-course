const Product = require('../models/product')


exports.getAddProductPage = (req, res, next) => {
    res.render('admin/edit-product', {pageTitle: "Add Product",
        path: 'admin/add-product',
        product: false})
}

exports.postAddProductPage = (req, res, next) => {
    const { title, imageUrl, price, description } = req.body
    const product = new Product(title, price, description, imageUrl, null, req.user._id)
    product.save()
        .then(() => {
            res.redirect('/admin/products')
        })
        .catch(e => console.log(e))
}


exports.getEditProductPage = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then( product => {
            if (!product) {
                return res.redirect('/')
            }
            res.render('admin/edit-product', {pageTitle: "Edit Product",
                path: 'admin/edit-product',
                product: product})
    }).catch(e => console.log(e))

}

exports.postEditProduct = (req, res, next) => {
    const { title, imageUrl, price, description, productId } = req.body
    const product = new Product(title, price, description, imageUrl, productId)
    product.save()
        .then(result => {
            res.redirect('/admin/products')
        })
        .catch(e => console.log(e))
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId
    Product.deleteById(prodId, req.user._id)
        .then(result => {
            res.redirect('/admin/products')
        })
        .catch(e => console.log(e))
}

exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll()
        .then(prods => {
            res.render('admin/products', {
                prods: prods,
                pageTitle: "Admin Products",
                path: '/admin/products'});
    }).catch(e => console.log(e))

}
