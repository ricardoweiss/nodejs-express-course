const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class Product {
    constructor(title, price, description, imageUrl, _id, userId) {
        this.title = title
        this.price = price
        this.description = description
        this.imageUrl = imageUrl
        this._id = _id ? new ObjectId(_id) : null
        this.userId = userId
    }

    save() {
        const db = getDb();
        if (this._id) {
            return db.collection('products').updateOne({_id: this._id}, {$set: this})
        }
        return db.collection('products').insertOne(this)
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products').find().toArray()
    }

    static findById(id) {
        const db = getDb()
        return db.collection('products').find({_id: new ObjectId(id)}).next()
    }


    static deleteById(prodId, userId) {
        const db = getDb();
        return db
            .collection('products')
            .deleteOne({_id: new ObjectId(prodId)})
            .then((result) => {
                return db.collection('users').updateOne(
                    {_id: new ObjectId(userId)},
                    {
                        $pull: {
                            'cart.items': {productId: new ObjectId(prodId)},
                        },
                    }
                );
            })
            .then((result) => {
                console.log('Cart Item Deleted');
            })
            .then(() => {
                console.log('Product Deleted');
            });
    }
}


module.exports = Product;