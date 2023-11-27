


const connection = require('../../db/connection');
const getMessages = async (req, res) => {

    const sql = `SELECT messages.id as message_id, users.login as user_login, messages.txt as message_txt
    FROM messages
    JOIN users ON messages.user_id = users.id;`;
    const messages = await query(sql);
    // console.log(sql)
    return messages;
}

const postMessage = async (req, res) => {
    const { user_id, txt } = req.body;
    const message = await query(`INSERT INTO messages (user_id, txt) VALUES (${user_id}, '${txt}')`);
    return message;
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

  module.exports = {getMessages, postMessage}
