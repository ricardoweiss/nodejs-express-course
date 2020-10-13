const path = require('path')
const fs = require('fs')

const rootDir = require('../util/path')

const p = path.join(rootDir, 'data', 'products.json')

module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title
        this.imageUrl = imageUrl
        this.description = description
        this.price = price
    }

    save() {
        this.id = Math.random();
        fs.readFile(p, (err, data) => {
            let products = [];
            if (!err) {
                products = JSON.parse(data)
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err)
            })
        })
    }

    static fetchAll(cb) {
        fs.readFile(p, (err, data) => {
            if (err) {
                cb([])
            } else {
                cb(JSON.parse(data))
            }
        })
    }

    static findById(id, cb) {
        this.fetchAll((products) => {
            const product = products.find(p => {
                const stringId = p.id.toString()
                return stringId === id
            })
            cb(product)
        })
    }
}