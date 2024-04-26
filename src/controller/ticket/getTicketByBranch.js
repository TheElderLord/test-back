const query = require("../../db/connection");
const getBranchList = require("../branch/getBranches");

const getBranchTickets = async (login,branch_id) => {
  try {
    const branches = await getBranchList(login,branch_id);
    // console.log(branches)
    const branchTicketsArray = {};

    await Promise.all(
      branches.map(async (branch) => {
        const { F_ID: branchId, F_NAME: branchName, children, ONN: branchOnline } = branch;
        const branchTickets = {
          INSERVICE: [],
          NEW: [],
          MISSED: [],
          COMPLETED: [],
          DELAYED: [],
          ALARM: [],
          online: branchOnline,
          branchId // Including branchId in branchTickets
        };

        await Promise.all(
          children.map(async (child) => {
            const { F_ID: childId, F_NAME: childName, ONN: childOnline } = child;
            const childTickets = {
              INSERVICE: [],
              NEW: [],
              MISSED: [],
              COMPLETED: [],
              DELAYED: [],
              ALARM: [],
              online: childOnline,
              branchId // Including branchId in childTickets
            };

            const rows = await query(
              `SELECT * FROM facts WHERE idbranch = ${childId} and state <> 'ZOMBIE' and state <> 'MISSED'`
            );
            rows.forEach((row) => {
              const { state, servover, waitover, rating } = row;
              if (!childTickets[state]) {
                childTickets[state] = [];
              }
              childTickets[state].push(row);
              if (
                servover == "true" ||
                waitover == "true" ||
                rating == "1" ||
                rating == "2"
              ) {
                childTickets.ALARM.push(row);
              }
            });

            branchTickets[childName] = childTickets;
          })
        );
        try {
          if(children.length === 0){
            return
          }
        const rows = await query(
          `SELECT * FROM facts WHERE idbranch IN (${children
            .map((child) => child.F_ID)
            .join(",")}) and state <> 'ZOMBIE' and state <> 'MISSED'`
        );
      
          rows.forEach((row) => {
            const { state, waitover, servover, rating } = row;
            if (!branchTickets[state]) {
              branchTickets[state] = [];
            }
            branchTickets[state].push(row);
            if (
              servover == "true" ||
              waitover == "true" ||
              rating == "1" ||
              rating == "2"
            )
              branchTickets.ALARM.push(row);
          });
        } catch (err) {
          console.log(err);
        }

        branchTicketsArray[branchName] = branchTickets;
      })
    );

    const branchObject = branches.map((branch) => {
      const { F_NAME: branchName, F_ID: branchId, children, ONN: branchOnline } = branch; // Including branchId here
      const branchTickets = branchTicketsArray[branchName];

      const childObjects = children.map((child) => {
        const { F_NAME: childName, F_ID: childId, ONN: childOnline } = child; // Including childId here
        const childTickets = branchTickets[childName];

        return {
          branchName: childName,
          branchId: childId, // Including childId in childObjects
          online: childOnline,
          stateTickets: {
            INSERVICE: childTickets.INSERVICE.length,
            NEW: childTickets.NEW.length,
            MISSED: childTickets.MISSED.length,
            COMPLETED: childTickets.COMPLETED.length,
            DELAYED: childTickets.DELAYED.length,
            ALARM: childTickets.ALARM.length,
          },
        };
      });

      return {
        branchName,
        branchId, // Including branchId here
        online: branchOnline,
        stateTickets: {
          INSERVICE: branchTickets.INSERVICE.length,
          NEW: branchTickets.NEW.length,
          MISSED: branchTickets.MISSED.length,
          COMPLETED: branchTickets.COMPLETED.length,
          DELAYED: branchTickets.DELAYED.length,
          ALARM: branchTickets.ALARM.length,
        },
        children: childObjects,
      };
    });

    return branchObject;
  } catch (err) {
    console.error(err);
    // throw err; // Propagate the error
  }
};

module.exports = getBranchTickets;
