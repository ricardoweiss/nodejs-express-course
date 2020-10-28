const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const User = require('./models/user')
const errorsController = require('./controllers/errors')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('5f99c01bf92a712a848ca1e4')
        .then(user => {
            req.user = user;
            next()
        })
        .catch(e => console.log(e))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorsController.getPageNotFound);

mongoose.connect('mongodb+srv://adminjs:r9bru85a@cluster0.gdy2r.mongodb.net/shop?retryWrites=true&w=majority')
    .then(result => {
        return User.findOne()
    })
    .then(user => {
        if (!user) {
            const user = new User({
                username: 'ricardo',
                email: 'ricardo@test.com',
                cart: {
                    items: []
                }
            })

            user.save()
        }
        app.listen(3000)
    })
    .catch(e => console.log(e))