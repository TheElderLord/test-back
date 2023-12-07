


const connection = require('../../db/connection');
const getLastUsers = async (req, res) => {

  const users = await query("SELECT * FROM users ORDER BY STR_TO_DATE(sign_in_date, '%Y-%d-%m %H:%i:%s') DESC LIMIT 20;");
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

module.exports = getLastUsers;
