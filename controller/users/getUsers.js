const query = require("../../db/connection");
const getUsers = async () => {
  const users = await query("SELECT * FROM users");
  return users;
};

module.exports = getUsers;
