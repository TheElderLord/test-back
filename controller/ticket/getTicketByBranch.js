const connection = require('../../db/connection');
const getBranchList = require('../branch/getBranches');

const getBranchTickets = async () => {
  const branches = await getBranchList();
  const rootBranches = branches.map((branch) => {
    return {
      id: branch.F_ID,
      name: branch.F_NAME,
      children: branch.children.map((child) => {
        return {
          id: child.F_ID,
          name: child.F_NAME,
        };
      }),
    };
  });

  try {
    const branchTicketsArray = {};

    await Promise.all(
      rootBranches.map(async (branch) => {
        const branchName = branch.name;
        const branchId = branch.id;
        const children = branch.children;

        if (!branchTicketsArray[branchName]) {
          branchTicketsArray[branchName] = [];
        }

        const rows = await query(`SELECT * FROM facts WHERE idbranch IN (${children.map((child) => child.id).join(",")})`);

       
          rows.map(async (row) => {
            const servover = row.servover;
            const waitover = row.waitover;
            const rate = row.rating;
            const serviceName = row.servicename;
            const state = row.state;

            // if (!branchTicketsArray[branchName][serviceName]) {
            //   branchTicketsArray[branchName][serviceName] = [];
            // }

            if (!branchTicketsArray[branchName]["INSERVICE"]) {
              branchTicketsArray[branchName]["INSERVICE"] = [];
            }
            if (!branchTicketsArray[branchName]["NEW"]) {
              branchTicketsArray[branchName]["NEW"] = [];
            }
            if (!branchTicketsArray[branchName]["MISSED"]) {
              branchTicketsArray[branchName]["MISSED"] = [];
            }
            if (!branchTicketsArray[branchName]["COMPLETED"]) {
              branchTicketsArray[branchName]["COMPLETED"] = [];
            }
            if (!branchTicketsArray[branchName]["DELAYED"]) {
              branchTicketsArray[branchName]["DELAYED"] = [];
            }

            // branchTicketsArray[branchName][serviceName].push(row);
            if(state === "INSERVICE"){
              branchTicketsArray[branchName]["INSERVICE"].push(row);
            }
            if(state === "NEW"){
              branchTicketsArray[branchName]["NEW"].push(row);
            }
            if(state === "MISSED"){
              branchTicketsArray[branchName]["MISSED"].push(row);
            }
            if(state === "COMPLETED"){
              branchTicketsArray[branchName]["COMPLETED"].push(row);
            }
            if(state === "DELAYED"){
              branchTicketsArray[branchName]["DELAYED"].push(row);
            }

          })
        
      })
    );
      const branchObject = Object.keys(branchTicketsArray).map((branchName) => {
        const ins = branchTicketsArray[branchName]["INSERVICE"];
        const newT = branchTicketsArray[branchName]["NEW"];
        const mis = branchTicketsArray[branchName]["MISSED"];
        const com = branchTicketsArray[branchName]["COMPLETED"];
        const del = branchTicketsArray[branchName]["DELAYED"];
        return {
          branchName: branchName,
          stateTickets: {
            INSERVICE: ins ? ins.length : 0,
            NEW: newT ? newT.length : 0,
            MISSED: mis ? mis.length : 0,
            COMPLETED: com ? com.length : 0,
            DELAYED: del ? del.length : 0,
          },
        };
      });
      
      return branchObject;
  } catch (err) {
    console.error(err);
    throw err; // Propagate the error
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

module.exports = getBranchTickets;
