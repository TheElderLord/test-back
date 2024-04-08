const query = require("../../db/connection");

const getUser = async (login) => {
  const user = await query("Select * FROM users WHERE login = ?", [login]);
  return user;
};

const deleteUser = async (login) => {
  const user = await query("DELETE FROM users WHERE id = ?", [login]);
  return user;
};
const updateUser = async (id, body) => {
  const { login, password, email } = body;
  const user = await query(
    `UPDATE users SET login = '${login}', password = '${password}', email = '${email}' WHERE id = ${id}`
  );
  return user;
};

module.exports = { deleteUser, updateUser, getUser };
