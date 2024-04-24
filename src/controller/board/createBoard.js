const query = require("../../db/connection");

const getBoardMessages = async (user_id, title, body, valid_date, role) => {
  try {
    // Get count of existing board messages for the user
    const getCountQuery = `SELECT COUNT(*) AS messageCount FROM board WHERE user_id = ? and valid_to > NOW();`;
    const countResult = await query(getCountQuery, [user_id]);
    const messageCount = countResult[0].messageCount;
    // console.log(messageCount);
    // Check if the user has less than 2 board messages
    if (messageCount < 2) {
      const currentDate = new Date().toLocaleString("ru-RU");

      // Insert the new board message
      const insertQuery = `
        INSERT INTO board (user_id, title, board_body, created_at, valid_to, role)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      await query(insertQuery, [user_id, title, body, currentDate, valid_date, role]);

      return true; // Indicate successful insertion
    } else {
      console.log("User already has 2 or more board messages");
      return false; // Indicate failure due to message limit reached
    }
  } catch (err) {
    console.log(err);
    // throw err;
  }
};

module.exports = getBoardMessages;
