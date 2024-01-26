const { error } = require("console");
const query = require("../../db/connection");

const getAllTickets = async (login) => {
  console.log("get tickets", login);

  if (login === "admin" || login === "kgd") {
    const sql = `SELECT * FROM facts where state <> 'ZOMBIE' and state <> 'MISSED'`;

    const tickets = await query(sql);
    // console.log(tickets)
    return tickets;
  } else {
    try {
      const user_branches = await query(
        `SELECT id_branch FROM users WHERE login = '${login}'`
      );

      // Extracting an array of branch IDs
      // console.log("User branches", user_branches)
      if (!user_branches) {
        return;
      }
      const branchIds = user_branches[0].id_branch.split(",");
      // console.log(branchIds);

      // if (branchIds.length === 0) {
      //     // Handle the case when there are no branches
      //     return [];
      // }

      const sql = `SELECT * FROM facts WHERE idbranch IN (${branchIds.join(
        ","
      )}) AND state <> 'ZOMBIE' AND state <> 'MISSED'`;

      const tickets = await query(sql);
      return tickets;
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = getAllTickets;
