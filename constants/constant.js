const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    dbhost: process.env.DB_HOST,
    dbuser: process.env.DB_USER,
    dbpassword: process.env.DB_PASSWORD,
    dbname: process.env.DB_NAME,
    dbport: process.env.DB_PORT
}