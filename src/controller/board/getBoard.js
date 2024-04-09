const query = require("../../db/connection");

const getBoardMessages = async () => {
  // console.log(branchId);
  try {
    const rows = await query(
      `SELECT b.*,u.login FROM board b
      left join users u 
      on u.id = b.user_id;`
    );
    // console.log(rows);
    return rows;
  } catch (err) {
    console.log(err);
    // throw err;
  }
};

module.exports = getBoardMessages;
