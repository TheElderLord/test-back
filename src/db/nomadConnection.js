
const constants = require('../constants/constant')

const host = constants.dbnomadHost;
const user = constants.dbnomadUser;
const password = constants.dbnomadPass;
const database = constants.dbNomad;
const port = constants.dbnomadPort;




const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: host,
  user: user,
  password: password,
  database: database,
  port: port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Get a connection from the pool
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database!');
    connection.release();
  }
});

function query(sql, values) {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}



module.exports = query;

