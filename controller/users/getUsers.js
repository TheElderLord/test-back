


const connection = require('../../db/connection');
const getUsers = async (req, res) => {
    const users = await query('SELECT * FROM users');
    return users;
}



function query(sql, values) {
    return new Promise((resolve, reject) => {
      connection.query(sql, values, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  module.exports = getUsers;
