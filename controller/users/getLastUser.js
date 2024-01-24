const query = require("../../db/connection");
const getLastUsers = async () => {
  try {
    const users = await query(
      "SELECT * FROM users ORDER BY STR_TO_DATE(sign_in_date, '%Y-%d-%m %H:%i:%s') DESC LIMIT 20;"
    );
    return users;
  } catch (err) {
    console.log(err);
  }
};

module.exports = getLastUsers;
