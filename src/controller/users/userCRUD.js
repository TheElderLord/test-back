const query = require("../../db/connection");
const getbranches = require("../branch/getBranches");
const { format } = require('date-fns');

exports.getUsers = async (login) => {
  try {
    if (login === "admin" || login === "kgd") {
      const users = await query("SELECT * FROM users");
      return users;
    } else {
      const branches = `Select id_branch from users where login = ?`;
      const userBranches = await query(branches, login);
      if (userBranches) {
        console.log(userBranches);
        const users = await query(
          `SELECT * FROM users where id_branch in (${userBranches[0].id_branch})`
        );
        return users;
      }
      return;
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getUserById = async (id) => {
  try {
    const user = await query("Select * FROM users WHERE id = ?", [id]);
    return user;
  } catch (err) {
    console.log(err);
  }
};

exports.deleteUserById = async (id) => {
  try {
    const user = await query("DELETE FROM users WHERE id = ?", [id]);
    return user;
  } catch (err) {
    console.log(err);
    return false;
  }
};
// exports.updateUser = async (id, body) => {
//   const { login, password, email } = body;
//   const user = await query(
//     `UPDATE users SET login = '${login}', password = '${password}', email = '${email}' WHERE id = ${id}`
//   );
//   return user;
// };
exports.updateUserById = async (id, body) => {
  const { username, password, email, firstname, lastname } = body;
  try {
    const user = await query(
      `UPDATE users SET login = '${username}', password = '${password}',firstname = '${firstname}',lastname = '${lastname}', email = '${email}' WHERE id = '${id}'`
    );
    return user;
  } catch (err) {
    console.log(err);
    return false;
  }
};

exports.createUser = async (body) => {
  const { username, password, id_branch } = body;
  const createdData = new Date();
  // console.log(createdData);
  const formattedDate = format(createdData, 'yyyy-MM-dd HH:mm:ss');
  try {
    const sql =
      "Insert into users(login,password,id_branch,ins_date) values(?,?,?,?)";
    await query(sql, [
      username,
      password,
      id_branch,
      formattedDate
    ]);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }

  console.log(insSql);
};
