const query = require("../../db/connection");
const getLastUsers = async (login) => {
  try {
    if (login === "admin" || login === "kgd") {
      const users = await query(
        "SELECT * FROM users ORDER BY STR_TO_DATE(sign_in_date, '%Y-%d-%m %H:%i:%s') DESC LIMIT 20;"
      );
      return users;
    } else {
      const users = await query(
        `SELECT * FROM users where login = '${login}' ORDER BY STR_TO_DATE(sign_in_date, '%Y-%d-%m %H:%i:%s')  DESC LIMIT 20 ;`
      );
      return users;
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = getLastUsers;
