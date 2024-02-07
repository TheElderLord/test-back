const query = require("../../db/connection");
const getUsers = async (login) => {
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

module.exports = getUsers;
