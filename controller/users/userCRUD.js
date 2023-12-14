const connection = require('../../db/connection');






const deleteUser = async (userId) => {
    const user = await query('DELETE FROM users WHERE id = ?',[userId]);
    return user;
}
const updateUser = async (id,body)=>{
    const {login, password, email} = body;
    const user = await query(`UPDATE users SET login = '${login}', password = '${password}', email = '${email}' WHERE id = ${id}`);
    return user;
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

module.exports = {deleteUser,updateUser};