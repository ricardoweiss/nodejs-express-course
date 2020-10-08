const path = require('path')
const fs = require('fs')

const rootDir = require('../util/path')

const p = path.join(rootDir, 'data', 'products.json')

module.exports = class Product {
    constructor(title) {
        this.title = title
    }

    save() {
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
}