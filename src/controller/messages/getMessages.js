const query = require("../../db/connection");

const getMessages = async (userLogin) => {
  const sql = `SELECT messages.id as message_id, users.id as user_id, messages.seen as mseen, users.login as user_login, created_at, updated_at, messages.txt as message_txt
    FROM messages
    JOIN users ON messages.user_id = users.id;`;

  try {
    const messages = await query(sql);

    // if (id) {
    const formattedMessages = messages.map((message) => {
      const seenMess = message.mseen.split(",");

      // Check if the user has seen the message
      const isSeen = seenMess.includes(userLogin);

      // Create a new JSON object with the 'seen' status
      return {
        message_id: message.message_id,
        user_id: message.user_id,
        mseen: isSeen ? 1 : 0,
        user_login: message.user_login,
        created_at: message.created_at,
        updated_at: message.updated_at,
        message_txt: message.message_txt,
      };
    });

    return formattedMessages;
  } catch (err) {
    console.log(err);
  }
  // }

  // return messages;
};

module.exports = getMessages;
