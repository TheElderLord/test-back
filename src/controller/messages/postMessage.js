
const query = require("../../db/connection");


const postMessage = async (login, txt,id) => {
    try {
    //   const { user_id, txt } = req.body;
      console.log("post triggered");
    //   const message = await query(
    //     `INSERT INTO messages (user_id, txt,seen) VALUES (${id}, '${txt}'))`
    //   );
      const message = await query(
        `INSERT INTO messages (user_id, txt,seen) VALUES (${id}, '${txt}',CONCAT(seen, ',${login}'))`
      );
      return message;
    } catch (err) {
      console.log(err);
    }
  };

  module.exports = postMessage;