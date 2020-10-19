const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorsController = require('./controllers/errors')
const sequelize = require('./util/database');
const Product = require('./models/product')
const User = require('./models/user')

const app = express();

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(e => console.log(e))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorsController.getPageNotFound);

sequelize.sync()
    .then(r => {
        return User.findByPk(1)
    })
    .then(user => {
        if (!user) {
            return User.create({ name: 'Ricardo', email: 'test@sada.com'})
        }
        return user;
    })
    .then(user => {
        app.listen(3000);
    })
    .catch(e => console.log(e))



