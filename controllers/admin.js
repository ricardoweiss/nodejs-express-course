const Product = require('../models/product')


exports.getAddProductPage = (req, res, next) => {
    res.render('admin/edit-product', {pageTitle: "Add Product",
        path: 'admin/add-product',
        product: false})
}

exports.postAddProductPage = (req, res, next) => {
    const { title, imageUrl, price, description } = req.body
    const product = new Product(null, title, imageUrl, description, price);
    product.save();
    res.redirect('/');
}

exports.getEditProductPage = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, (product) => {
        res.render('admin/edit-product', {pageTitle: "Edit Product",
            path: 'admin/edit-product',
            product: product})
    })

}

exports.postEditProduct = (req, res, next) => {
    const { title, imageUrl, price, description, productId } = req.body
    const product = new Product(productId, title, imageUrl, description, price)
    product.save();
    res.redirect('/admin/products')
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId
    Product.delete(prodId)
    res.redirect('/admin/products')
}

exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: "Admin Products",
            path: '/admin/products'});
    })
}