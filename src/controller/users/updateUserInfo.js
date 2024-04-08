const query = require("../../db/connection");

const updateUser = async (authLogin, body) => {
    const { username, password, email,firstname,lastname } = body;
    const user = await query(
      `UPDATE users SET login = '${username}', password = '${password}',firstname = '${firstname}',lastname = '${lastname}', email = '${email}' WHERE login = '${authLogin}'`
    );
    return user;
  };

module.exports = updateUser;