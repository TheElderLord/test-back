const connection = require('../db/connection');

exports.getTickets = async(req, res)=>{
    try{
        const branches = await query('SELECT id, F_ID, F_NAME, F_IP_ADDRESS, F_PARENT_ID, ONN FROM branches');
        const branchMap = {};
        const rootBranches = [];
        // console.log('branches', branches);
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

          const tickets = await query('SELECT * FROM facts');
          
          const data ={
            message: 'Success',
            size: rootBranches.length,
            rows: rootBranches
          }
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Error',
            error: err
        });
    }
}

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