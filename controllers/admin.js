const Product = require('../models/product')


exports.getAddProductPage = (req, res, next) => {
    res.render('admin/edit-product', {pageTitle: "Add Product",
        path: 'admin/add-product',
        product: false})
}

exports.postAddProductPage = (req, res, next) => {
    const { title, imageUrl, price, description } = req.body
    console.log(req.user)
    const product = new Product(title, price, description, imageUrl)
    product.save()
        .then(() => {
            res.redirect('/admin/add-product')
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
    Product.findById(productId)
        .then(product => {
            product.title = title
            product.imageUrl = imageUrl
            product.price = price
            product.description = description
            return product.save()

    })
        .then(result => {
            res.redirect('/admin/products')
        })
        .catch(e => console.log(e))

}
/*
exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId
    Product.findByPk(prodId).then(product => {
        return product.destroy()
    })
        .then(result => {
            res.redirect('/admin/products')
        })
        .catch(e => console.log(e))
}

*/
exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll()
        .then(prods => {
            res.render('admin/products', {
                prods: prods,
                pageTitle: "Admin Products",
                path: '/admin/products'});
    }).catch(e => console.log(e))

}
