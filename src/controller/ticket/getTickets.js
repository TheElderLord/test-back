const { error } = require("console");
const query = require("../../db/connection");

const getAllTickets = async ( login,branch_id) => {
  // console.log("get tickets", login);
 
  if (login === "admin" || login === "kgd") {
    let sql;
    if (branch_id) {
      const childSql = `Select * from branches where F_PARENT_ID = ${branch_id}`;
      const childBranches = await query(childSql);
      console.log(childBranches);
      if(childBranches.length !== 0 ){
        // console.log("here")
        sql = `SELECT * FROM facts where state <> 'ZOMBIE' and state <> 'MISSED' and idbranch IN (${childBranches
          .map((child) => child.F_ID)
          .join(",")})`;
      }
      else {
        sql  = `Select * from facts where idbranch = ${branch_id} and state <> 'ZOMBIE' and state <> 'MISSED'`
      }
     
    }
    else sql = `SELECT * FROM facts where state <> 'ZOMBIE' and state <> 'MISSED'`;
    // console.log(sql);
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
      // console.log("there")
      const sql = `SELECT * FROM facts WHERE idbranch IN (${branchIds.join(
        ","
      )}) AND state <> 'ZOMBIE' AND state <> 'MISSED' and state <> 'WAIT'`;
     
      const tickets = await query(sql);
      return tickets;
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = getAllTickets;
