
const dotenv = require('dotenv');
dotenv.config();
const host = process.env.MYSQL_HOST;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASS;
const database = process.env.MYSQL_DB;
const port = process.env.MYSQL_PORT;



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
    console.error('Error connecting to database:', err);
    return;
  }

  console.log('Connected to database!');

  // Perform database operations here

  // Release the connection back to the pool
  connection.release();
});

// Close the connection pool when the application exits
process.on('SIGINT', () => {
  pool.end();
  process.exit();
});

module.exports = pool;


