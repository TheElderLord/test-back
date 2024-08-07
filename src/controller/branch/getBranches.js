const query = require("../../db/connection");

const getBranchList = async (login,type) => {
  try {
    // console.log("Branches login",login)
    const branchMap = {};
    const rootBranches = [];

    if (login === "admin" || login === "kgd") {
      let sql = `SELECT * FROM branches`;
      if(type){
        if(type === "online") sql = `SELECT * FROM branches where ONN = 1 OR F_PARENT_ID = 101`;
        else if(type === "offline") sql =`SELECT * FROM branches where ONN=0 OR F_PARENT_ID IS 101`;
      }
      // console.log(sql);
      const branches = await query(sql);

      // Create a map for quick access using F_ID
      branches.forEach((branch) => {
        branch.children = [];
        branchMap[branch.F_ID] = branch;
        branch.F_NAME = branch.F_NAME.replace("RU=", "");
      });

      // Identify root branches and add child branches accordingly
      branches.forEach((branch) => {
        const parentId = branch.F_PARENT_ID;
        if (parentId == "101") {
          // Root branch
          rootBranches.push(branch);
        } else if (branchMap[parentId]) {
          // Child branch
          branchMap[parentId].children.push(branch);
        }
      });

      return rootBranches;
    } else if(login) {
      const sqlSelectIdBranch = `SELECT id_branch FROM users WHERE login = '${login}'`;
      const rows = await query(sqlSelectIdBranch);
      const branches = rows[0].id_branch;
      // console.log("Sql select",branches)

      const sql = `SELECT * FROM branches WHERE F_ID IN (${branches})`;
      const branchesResult = await query(sql);
      // console.log("branchesResult",branchesResult)

      const rootSql = `SELECT * FROM branches WHERE F_ID = ${branchesResult[0].F_PARENT_ID}`;
      const rootBranch = await query(rootSql);
      // console.log("Rootbranches",rootBranch)

      branchesResult.push(rootBranch[0]);

      // Create a map for quick access using F_ID
      branchesResult.forEach((branch) => {
        branch.children = [];
        branchMap[branch.F_ID] = branch;
        branch.F_NAME = branch.F_NAME.replace("RU=", "");
      });

      // Identify root branches and add child branches accordingly
      branchesResult.forEach((branch) => {
        const parentId = branch.F_PARENT_ID;
        if (parentId === "101") {
          // Root branch
          rootBranches.push(branch);
        } else if (branchMap[parentId]) {
          // Child branch
          branchMap[parentId].children.push(branch);
        }
      });

      return rootBranches;
    }
  } catch (error) {
    console.error("Error in getBranchList:", error);
    // throw error;
  }
};

module.exports = getBranchList;
