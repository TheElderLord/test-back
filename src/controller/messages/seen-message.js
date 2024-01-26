const query = require("../../db/connection");

const makeSeen = async (messageId, username) => {
  try {
    const sql = `UPDATE messages SET seen = CONCAT(seen, ',${username}') WHERE id = ${messageId} `;
    // console.log(sql)
    // Use await to wait for the query to complete
    const result = await query(sql);

    console.log(result);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = makeSeen;
