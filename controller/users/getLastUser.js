


const connection = require('../../db/connection');
const getLastUsers = async (req, res) => {
    const users = await query('SELECT * FROM sitcenter_kgd.users order by sign_in_date desc limit 20;');
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
