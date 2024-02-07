const query = require("../../db/connection");

const getBranchList = async (login) => {
  try {
    // console.log("Branches login",login)
    const branchMap = {};
    const rootBranches = [];

    if (login === "admin" || login === "kgd") {
      const sql = `SELECT id, F_ID, F_NAME, F_IP_ADDRESS, F_PARENT_ID, ONN FROM branches`;
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
        if (parentId === "101") {
          // Root branch
          rootBranches.push(branch);
        } else if (branchMap[parentId]) {
          // Child branch
          branchMap[parentId].children.push(branch);
        }
      });

      return rootBranches;
    } else {
      const sqlSelectIdBranch = `SELECT id_branch FROM users WHERE login = '${login}'`;
      const rows = await query(sqlSelectIdBranch);
      const branches = rows[0].id_branch;

      const sql = `SELECT id, F_ID, F_NAME, F_IP_ADDRESS, F_PARENT_ID, ONN FROM branches WHERE F_ID IN (${branches})`;
      const branchesResult = await query(sql);

      const rootSql = `SELECT id, F_ID, F_NAME, F_IP_ADDRESS, F_PARENT_ID, ONN FROM branches WHERE F_ID = ${branchesResult[0].F_PARENT_ID}`;
      const rootBranch = await query(rootSql);

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
