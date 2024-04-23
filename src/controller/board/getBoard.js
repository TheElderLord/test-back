const query = require("../../db/connection");

const getBoardMessages = async () => {
  try {
    const rows = await query(`
      SELECT b.*, u.login 
      FROM board b
      LEFT JOIN users u ON u.id = b.user_id
      WHERE b.valid_to > NOW(); -- Filter out expired messages
    `);
    return rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = getBoardMessages;
