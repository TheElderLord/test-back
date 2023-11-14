const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    dbhost: process.env.MYSQL_HOST,
    dbuser: process.env.MYSQL_USER,
    dbpassword: process.env.MYSQL_PASS,
    dbname: process.env.MYSQL_DB,
    dbport: process.env.MYSQL_PORT,

    port: process.env.PORT,
}