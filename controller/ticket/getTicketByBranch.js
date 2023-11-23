const connection = require('../../db/connection');
const getBranchList = require('../branch/getBranches');

const getBranchTickets = async () => {
  try {
    const branches = await getBranchList();
    const branchTicketsArray = {};

    await Promise.all(
      branches.map(async (branch) => {
        const { F_ID: branchId, F_NAME: branchName, children } = branch;
        const branchTickets = {
          INSERVICE: [],
          NEW: [],
          MISSED: [],
          COMPLETED: [],
          DELAYED: [],
        };

        await Promise.all(
          children.map(async (child) => {
            const { F_ID: childId, F_NAME: childName } = child;
            const childTickets = {
              INSERVICE: [],
              NEW: [],
              MISSED: [],
              COMPLETED: [],
              DELAYED: [],
            };

            const rows = await query(`SELECT * FROM facts WHERE idbranch = ${childId}`);
            rows.forEach((row) => {
              const { state } = row;
              childTickets[state].push(row);
            });

            branchTickets[childName] = childTickets;
          })
        );

        const rows = await query(`SELECT * FROM facts WHERE idbranch IN (${children.map((child) => child.F_ID).join(",")})`);
        rows.forEach((row) => {
          const { state } = row;
          branchTickets[state].push(row);
        });

        branchTicketsArray[branchName] = branchTickets;
      })
    );

    console.log(branchTicketsArray);

    const branchObject = branches.map((branch) => {
      const { F_NAME: branchName, children } = branch;
      const branchTickets = branchTicketsArray[branchName];

      const childObjects = children.map((child) => {
        const { F_NAME: childName } = child;
        const childTickets = branchTickets[childName];

        return {
          branchName: childName,
          stateTickets: {
            INSERVICE: childTickets.INSERVICE.length,
            NEW: childTickets.NEW.length,
            MISSED: childTickets.MISSED.length,
            COMPLETED: childTickets.COMPLETED.length,
            DELAYED: childTickets.DELAYED.length,
          },
        };
      });

      return {
        branchName,
        stateTickets: {
          INSERVICE: branchTickets.INSERVICE.length,
          NEW: branchTickets.NEW.length,
          MISSED: branchTickets.MISSED.length,
          COMPLETED: branchTickets.COMPLETED.length,
          DELAYED: branchTickets.DELAYED.length,
        },
        children: childObjects,
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
