const query = require("../../db/connection");
const getBranchList = async (login) => {
    try {
      const branchMap = {};
      const rootBranches = [];
  
      if (login === "admin" || login === "kgd") {
        let sql = `SELECT * FROM branches`;
  
        const branches = await query(sql);
  
        // Create a map for quick access using F_ID
        branches.forEach((branch) => {
          branch.children = [];
          branch.isSwitchable = true; // Assume all branches are switchable by default for admins
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
      } else if (login) {
        const sqlSelectRole = `SELECT role FROM users WHERE login = '${login}'`;
        const [roleRow] = await query(sqlSelectRole);
        const userRole = roleRow.role;
  
        const sqlSelectBlockedBranches = `SELECT * FROM branches WHERE blocked = 1 AND blocked_by <= ${userRole}`;
        const blockedBranches = await query(sqlSelectBlockedBranches);
        const blockedBranchIds = blockedBranches.map(branch => branch.F_ID);
  
        const sqlSelectUserBranches = `SELECT * FROM branches WHERE F_ID IN (SELECT id_branch FROM users WHERE login = '${login}')`;
        const userBranches = await query(sqlSelectUserBranches);
  
        // Create a map for quick access using F_ID
        userBranches.forEach((branch) => {
          branch.children = [];
          branch.isSwitchable = !blockedBranchIds.includes(branch.F_ID); // Check if branch is not blocked
          branchMap[branch.F_ID] = branch;
          branch.F_NAME = branch.F_NAME.replace("RU=", "");
        });
  
        // Identify root branches and add child branches accordingly
        userBranches.forEach((branch) => {
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
      throw error;
    }
  };
  
  module.exports = getBranchList;
  