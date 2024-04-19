const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    dbhost: process.env.MYSQL_HOST,
    dbuser: process.env.MYSQL_USER,
    dbpassword: process.env.MYSQL_PASS,
    dbname: process.env.MYSQL_DB,
    dbport: process.env.MYSQL_PORT,

    dbnomadHost:process.env.MYSQL_NOMAD_HOST,
    dbnomadUser:process.env.MYSQL_NOMAD_USER,
    dbnomadPass:process.env.MYSQL_NOMAD_PASS,
    dbNomad:process.env.MYSQL_NOMAD_DB,
    dbnomadPort:process.env.MYSQL_NOMAD_PORT,
    

    port: process.env.PORT,
    host: process.env.HOST,
    websocket_port:process.env.WEBSOCKET_PORT,

    secret: process.env.SECRET_KEY,

    nomad_host : process.env.NOMAD_SERVER_HOST,
    nomad_port : process.env.NOMAD_SERVER_PORT,

}