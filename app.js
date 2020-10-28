const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
/*const User = require('./models/user')*/
const errorsController = require('./controllers/errors')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

/*app.use((req, res, next) => {
    User.findById('5f98163e1fcb6a894fcbae58')
        .then(user => {
            req.user = new User(user.username, user.email, user.cart, user._id);
            next()
        })
        .catch(e => console.log(e))
})*/

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorsController.getPageNotFound);

mongoose.connect('mongodb+srv://adminjs:r9bru85a@cluster0.gdy2r.mongodb.net/shop?retryWrites=true&w=majority')
    .then(result => {
        app.listen(3000)
    })
    .catch(e => console.log(e))