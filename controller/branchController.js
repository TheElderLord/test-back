const connection = require('../db/connection');

exports.getBranches = async (req, res) => {
  try {
    const branchRows = await query('SELECT id, F_ID, F_NAME, F_IP_ADDRESS, F_PARENT_ID, ONN FROM branches');

    const branchInfo = {};
    const branchMap = {};
    const rootBranches = [];

    // Use Promise.all to wait for all inner queries to finish
    await Promise.all(branchRows.map(async (branch) => {
      branch.children = [];
      branchMap[branch.F_ID] = branch;

      const { F_NAME: branchName, F_ID: branchId, F_PARENT_ID: parent_id } = branch;

      if (!branchInfo[branchName]) {
        branchInfo[branchName] = [];
      }
      if (parent_id === "101") {
        // Root branch
        rootBranches.push(branch);
      } else if (branchMap[parent_id]) {
        // Child branch
        branchMap[parent_id].children.push(branch);
        delete branch.children;
      }
      
     


      


      const ticketRows = await query('SELECT * FROM facts WHERE idbranch = ?', [branchId]);
      branchInfo[branchName] = ticketRows;
    }));
   
    const responseArray = Object.keys(branchInfo).map((branchName) => ({
      branchName,
      length: branchInfo[branchName].length,
      branches: branchInfo[branchName],
    }));

    res.status(200).json({
      parent: rootBranches,
      message: 'Success',
      size: branchRows.length,
      data: branchRows,
      branchInfo: responseArray,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

// Helper function for querying the database with Promises
function query(sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}
