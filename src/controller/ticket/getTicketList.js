const query = require("../../db/connection");

const getTicketList = async (login, page, limit, filter, branch_id) => {
  // console.log("get tickets", login);
  const offset = (page - 1) * limit;
  let pagesCount = 0;
  let sql;

  if (login === "admin" || login === "kgd") {
    try {
      if (branch_id) {
        const childSql = `Select * from branches where F_PARENT_ID = ${branch_id}`;

        const childBranches = await query(childSql);
        // console.log(childBranches)
        if (childBranches.length > 0) {
          sql = `SELECT * FROM facts where state <> 'ZOMBIE' and state <> 'MISSED' and idbranch IN (${childBranches
            .map((child) => child.F_ID)
            .join(",")}) `;
        } else {
          sql = `Select * from facts where idbranch = ${branch_id} and state <> 'ZOMBIE' and state <> 'MISSED'`;
        }
      } else {
        sql = `SELECT * FROM facts where state <> 'ZOMBIE' and state <> 'MISSED' `;
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      const user_branches = await query(
        `SELECT id_branch FROM users WHERE login = '${login}'`
      );

      if (!user_branches) {
        return;
      }
      const branchIds = user_branches[0].id_branch.split(",");
      // console.log(branchIds);

      // if (branchIds.length === 0) {
      //     // Handle the case when there are no branches
      //     return [];
      // }

      sql = `SELECT * FROM facts WHERE idbranch IN (${branchIds.join(
        ","
      )}) AND state <> 'ZOMBIE' AND state <> 'MISSED' and state <> 'WAIT' `;
    } catch (err) {
      console.log("The error in ticket list")
      console.log(err);
    }
  }
  if (filter) {
    if (filter === "bad") {
      sql += ` and rating = 1 OR rating = 2`;
    } else if (filter === "wait") {
      sql += ` and waitover = 'true'`;
    } else if (filter === "serv") {
      sql += ` and servover = 'true'`;
    }
  }
  const totalSql = sql.replace("*", "count(*)");
  sql += ` LIMIT ${limit} OFFSET ${offset}`;
  // console.log(totalSql)
  const tickets = await query(sql);
  const totalQuery = await query(totalSql);
  // console.log(totalQuery)
  pagesCount = totalQuery[0]["count(*)"];
  // console.log(tickets)
  pagesCount = Math.ceil(pagesCount / limit);
  return { tickets, pagesCount };
};

module.exports = getTicketList;
