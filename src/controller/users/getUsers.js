const query = require("../../db/connection");
const getUsers = async (login) => {
  try {
    if (login === "admin" || login === "kgd") {
      const users = await query("SELECT * FROM users");
      return users;
    } else {
      const users = await query(`SELECT * FROM users where login = '${login}'`);
      return users;
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = getUsers;
