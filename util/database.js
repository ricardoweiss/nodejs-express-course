const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-course', 'root',  'r9bru85a', {dialect: 'mysql', host: 'localhost'} )

module.exports = sequelize