// Import the Sequelize constructor from library
const Sequelize = require('sequelize');

require('dotenv').config();

// Create connection to our database, pass in your MySQL info for username and pw
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'locahost',
    dialect: 'mysql',
    port: 3306
});


module.exports = sequelize;