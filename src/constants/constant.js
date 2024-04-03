const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    dbhost: process.env.MYSQL_HOST,
    dbuser: process.env.MYSQL_USER,
    dbpassword: process.env.MYSQL_PASS,
    dbname: process.env.MYSQL_DB,
    dbNomad:process.env.MYSQL_NOMAD,
    dbport: process.env.MYSQL_PORT,

    port: process.env.PORT,
    host: process.env.HOST,
    websocket_port:process.env.WEBSOCKET_PORT,

    secret: process.env.SECRET_KEY,

}