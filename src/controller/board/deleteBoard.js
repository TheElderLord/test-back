const query = require("../../db/connection");

const getBoardMessages = async (id) => {
  // console.log(branchId);
  try {
    const rows = await query(
      `Delete from board where id = ${id}`
    );
    // console.log(rows);
    return rows;
  } catch (err) {
    console.log(err);
    // throw err;
  }
};

module.exports = getBoardMessages;
