const query = require("../../db/connection");

const updateUser = async (authLogin, body) => {
    const { username, password, email } = body;
    const user = await query(
      `UPDATE users SET login = '${username}', password = '${password}', email = '${email}' WHERE login = '${authLogin}'`
    );
    return user;
  };

module.exports = updateUser;