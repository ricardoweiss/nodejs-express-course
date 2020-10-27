const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const User = require('./models/user')
const errorsController = require('./controllers/errors')
const mongoConnect = require('./util/database').mongoConnect;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('5f98163e1fcb6a894fcbae58')
        .then(user => {
            req.user = new User(user.username, user.email, user.cart, user._id);
            next()
        })
        .catch(e => console.log(e))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorsController.getPageNotFound);

mongoConnect(() => {
    app.listen(3000)
})

