const query = require("../../db/connection");

const getTicketList = async (login, page, limit, branch_id) => {
  // console.log("get tickets", login);
  const offset = (page - 1) * limit;
  let pagesCount = 0;
  if (login === "admin" || login === "kgd") {
    let sql;
    if (branch_id) {
      const childSql = `Select * from branches where F_PARENT_ID = ${branch_id}`;
      const childBranches = await query(childSql);
    //   console.log(childBranches);
      const totalQuery = await query(
        `SELECT * FROM facts where state <> 'ZOMBIE' and state <> 'MISSED' and idbranch IN (${childBranches
          .map((child) => child.F_ID)
          .join(",")})`
      );
      pagesCount = totalQuery.length;

      sql = `SELECT * FROM facts where state <> 'ZOMBIE' and state <> 'MISSED' and idbranch IN (${childBranches
        .map((child) => child.F_ID)
        .join(",")}) LIMIT ${limit} OFFSET ${offset}`;
    } else {
      const totalQuery = await query(
        `SELECT * FROM facts where state <> 'ZOMBIE' and state <> 'MISSED'`
      );
      pagesCount = totalQuery.length;
      sql = `SELECT * FROM facts where state <> 'ZOMBIE' and state <> 'MISSED' LIMIT ${limit} OFFSET ${offset}`;
    }
    const tickets = await query(sql);
    // console.log(tickets)
    pagesCount = Math.round(pagesCount / limit);
    return { tickets, pagesCount };
  } else {
    try {
      const user_branches = await query(
        `SELECT id_branch FROM users WHERE login = '${login}'`
      );

      if (!user_branches) {
        return;
      }
      const branchIds = user_branches[0].id_branch.split(",");
      console.log(branchIds);

      // if (branchIds.length === 0) {
      //     // Handle the case when there are no branches
      //     return [];
      // }

      const sql = `SELECT * FROM facts WHERE idbranch IN (${branchIds.join(
        ","
      )}) AND state <> 'ZOMBIE' AND state <> 'MISSED' and state <> 'WAIT' LIMIT ${limit} OFFSET ${offset}`;
      const totalQuery = await query(
        `SELECT * FROM facts WHERE idbranch IN (${branchIds.join(
          ","
        )}) AND state <> 'ZOMBIE' AND state <> 'MISSED' and state <> 'WAIT'`
      );

      pagesCount = totalQuery.length;
      const tickets = await query(sql);
      pagesCount = Math.round(pagesCount / limit);
      return { tickets, pagesCount };
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = getTicketList;
