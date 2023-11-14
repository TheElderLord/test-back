const connection = require('../db/connection');

exports.getBranches = async (req, res) => {
  
   connection.query('SELECT id, F_ID, F_NAME, F_IP_ADDRESS, F_PARENT_ID, ONN FROM branches', (err, rows) => {
    const branches = rows;
    const branchMap = {};
    const rootBranches = [];
    // console.log('branches', branches);
    
    // Create a map for quick access using F_ID
    branches.forEach(branch => {
      branch.children = [];
      branchMap[branch.F_ID] = branch;
      branch.F_NAME = branch.F_NAME.replace("RU=","");
    });
    
    // Identify parent branches and add child branches accordingly
    branches.forEach(branch => {
      const parentId = branch.F_PARENT_ID;
      if (parentId === "101") {
        // Root branch
        rootBranches.push(branch);
      } else if (branchMap[parentId]) {
        // Child branch
        branchMap[parentId].children.push(branch);
      }
    });
    const data ={
      message: 'Success',
      size: rootBranches.length,
      rows: rootBranches
    }
    
    res.status(200).json(data);

  });
   
   

  

 


}
