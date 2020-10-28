const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: {type: Array, required: true},

    user: {
        username: { type: String, required: true },
        userId: { type: Schema.Types.ObjectId, required: true, ref: 'User'}
    }
})


module.exports = mongoose.model('Order', orderSchema);