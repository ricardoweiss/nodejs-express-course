const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    cart: {
        items: [
            {
                productId: {type: Schema.Types.ObjectId},
                quantity: {type: Number, required: true}
            }],
    }
})

/*
const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
    constructor(username, email, cart, _id) {
        this.username = username;
        this.email = email;
        this.cart = cart;
        this._id = _id
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this)
    }

    addToCart(product) {
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString()
        })
        const updatedCartItems = [...this.cart.items]
        let newQuantity = 1
        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity
        } else {
            updatedCartItems.push({productId: new ObjectId(product._id), quantity: 1})
        }
        const updatedCart = {items: [...updatedCartItems]}
        const db = getDb();
        return db.collection('users').updateOne({_id: new ObjectId(this._id)}, {$set: {cart: updatedCart}})
    }

    getCart() {
        const db = getDb();
        const productsIds = this.cart.items.map(p => {
            return p.productId
        })
        return db.collection('products').find({_id: {$in: productsIds}}).toArray()
            .then(products => {
                return products.map(p => {
                    return {
                        ...p,
                        quantity:
                        this.cart.items.find(i => {
                            return i.productId.toString() === p._id.toString()
                        }).quantity
                    }
                })
            })
    }

    deleteCartProduct(productId) {
        const updatedCartItems = this.cart.items.filter(item => {
            return item.productId.toString() !== productId.toString();
        })
        const updatedCart = {items: [...updatedCartItems]}
        const db = getDb();
        return db.collection('users').updateOne({_id: new ObjectId(this._id)}, {$set: {cart: updatedCart}})
    }

    getOrders() {
        const db = getDb();
        return db.collection('orders').find({'user._id': new ObjectId(this._id)}).toArray();
    }

    addOrder() {
        const db = getDb()
        return this.getCart()
            .then(products => {
                const order = {
                    user: {
                        _id: new ObjectId(this._id),
                        username: this.username
                    },
                    items: products
                }
                return db.collection('orders').insertOne(order)
            })
            .then(result => {
                this.cart = []
                return db.collection('users').updateOne({_id: new ObjectId(this._id)}, {$set: {cart: {items: []}}})
            })
    }

    static findById(id) {
        const db = getDb();
        return db.collection('users').findOne({_id: new ObjectId(id)})
    }
}

module.exports = User;*/
