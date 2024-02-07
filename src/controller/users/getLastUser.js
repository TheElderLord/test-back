const query = require("../../db/connection");
const getLastUsers = async (login) => {
  try {
    if (login === "admin" || login === "kgd") {
      const users = await query(
        "SELECT * FROM users ORDER BY STR_TO_DATE(sign_in_date, '%Y-%d-%m %H:%i:%s') DESC LIMIT 20;"
      );
      return users;
    } else {
      const branches = `Select id_branch from users where login = ?`;
      const userBranches = await query(branches,login);
      if(userBranches){
        console.log(userBranches);
      
      const users = await query(
        `SELECT * FROM users where id_branch in (${userBranches[0].id_branch}) ORDER BY STR_TO_DATE(sign_in_date, '%Y-%d-%m %H:%i:%s')  DESC LIMIT 20 ;`
      );
      return users;
      }
      else {
        return
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = getLastUsers;
