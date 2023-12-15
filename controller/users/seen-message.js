const connection = require('../../db/connection');

const makeSeen = async (messageId, userId) => {
  try {
    const loginSql = `SELECT login FROM users WHERE id = '${userId}'`;
    const login = await query(loginSql);
    

    const sql = `UPDATE messages SET seen = CONCAT(seen, ',${login[0].login}') WHERE id = ${messageId} `;
    // console.log(sql)
    // Use await to wait for the query to complete
    const result = await query(sql);

    // console.log(result);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

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

module.exports = makeSeen;
