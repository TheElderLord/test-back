const query = require("../../db/connection");

const getBoardMessages = async (user_id,title,body,valid_date,role) => {
  // console.log(branchId);
  try {
    const currentDate = new Date().toLocaleString("ru-RU");
    const sql = `INSERT into board(user_id,title,board_body,created_at,valid_to,role) values(?,?,?,?,?,?)`;
    const rows = await query(sql,[user_id,title,body,currentDate,valid_date,role]);
    // console.log(rows);
    return rows;
  } catch (err) {
    console.log(err);
    // throw err;
  }
};

module.exports = getBoardMessages;
