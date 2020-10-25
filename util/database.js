const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://adminjs:r9bru85a@cluster0.gdy2r.mongodb.net/shop?retryWrites=true&w=majority')
        .then(client => {
            _db = client.db();
            callback()
        })
        .catch(e => {
            console.log(e);
            throw e;
        })
}

const getDb = () => {
    if (_db) {
        return _db
    }
    throw 'No db found!'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;