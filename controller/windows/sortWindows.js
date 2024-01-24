const connection = require("../../db/connection");
const { query } = require("./getWindows");

const sortWindows = async (branchId, windows) => {
  try {
    const ticketsToWindows = {};
    let newtickets = [];
    let servTickets = 0;
    // console.log('Windows:', windows);
    const newResponse = await query(
      `SELECT *  FROM facts WHERE state = 'NEW' AND idbranch = ${branchId}`
    );
    if (newResponse.length == 1) {
      newtickets.push(newResponse[0]);
    } else {
      newResponse.forEach((newResponse) => {
        newtickets.push(newResponse);
      });
    }
    // console.log(`SELECT COUNT(*) as count FROM facts WHERE state = 'NEW' AND idbranch = ${branchId}`)

    servTickets = await query(
      `SELECT COUNT(*) as count FROM facts WHERE state = 'INSERVICE' AND idbranch = ${branchId}`
    );
    servTickets = servTickets[0].count;
    for (const key in windows) {
      const window = windows[key];
      // console.log('Window:', window);
      // console.log('Operator'+window.idoperator);
      const active = window.idoperator * 1 == 0 ? false : true;
      // console.log(active);
      const opId = window.idoperator;
      const worktitle = window.worktitle;

      if (!ticketsToWindows[window.winno]) {
        ticketsToWindows[window.winno] = {};
      }

      if (!ticketsToWindows[window.winno].INSERVICE) {
        ticketsToWindows[window.winno].INSERVICE = [];
      }
      if (!ticketsToWindows[window.winno].DELAYED) {
        ticketsToWindows[window.winno].DELAYED = [];
      }

      ticketsToWindows[window.winno].active = active;
      ticketsToWindows[window.winno].worktitle = worktitle;
      ticketsToWindows[window.winno].operatorId = opId;

      if (!active) {
        continue;
      }

      const name = await query(
        `SELECT f_name FROM employee_list WHERE F_ID = ${opId}`
      );
      ticketsToWindows[window.winno].name = name[0].f_name;

      // const sql = `SELECT * FROM facts WHERE windownum = ${window.winno} and idbranch = ${branchId} and state <> 'COMPLETED'`;
      // const factRows = await query(sql);
      const insSql = `SELECT *  FROM facts WHERE windownum = ${window.winno} and idbranch = ${branchId} and state = 'INSERVICE'`;
      const inservCount = await query(insSql);
      // console.log(insSql)
      const delayedCount = await query(
        `SELECT *  FROM facts WHERE windownum = ${window.winno} and idbranch = ${branchId} and state = 'DELAYED'`
      );
      // console.log(delayedCount);
      if (inservCount.length == 1) {
        ticketsToWindows[window.winno].INSERVICE.push(inservCount[0]);
      } else {
        inservCount.forEach((inservCount) => {
          ticketsToWindows[window.winno].INSERVICE.push(inservCount);
        });
      }
      if (delayedCount.length == 1) {
        ticketsToWindows[window.winno].DELAYED.push(delayedCount[0]);
      } else {
        delayedCount.forEach((delayedCount) => {
          ticketsToWindows[window.winno].DELAYED.push(delayedCount);
        });
      }
      // ticketsToWindows[window.winno].INSERVICE.push(inservCount[0]);
      // ticketsToWindows[window.winno].DELAYED.push(delayedCount[0]);
    }

    const windowsJson = Object.keys(ticketsToWindows).map((key) => {
      const winInfo = ticketsToWindows[key];

      return {
        winno: key,
        operatorId: winInfo.operatorId,
        active: winInfo.active,
        worktitle: winInfo.worktitle,
        name: winInfo.name,
        INSERVICE: winInfo.INSERVICE,
        DELAYED: winInfo.DELAYED,
        // ticketTotal: (winInfo.INSERVICE || 0) + (winInfo.DELAYED || 0),
      };
    });
    // if(!windowsJson.serving){
    //     windowsJson.serving = 0;
    // }
    // if(!windowsJson.delayed){
    //     windowsJson.delayed = 0;
    // }
    // windowsJson.serving = servTickets;
    // windowsJson.delayed = newtickets;

    return { windowsJson, newtickets, servTickets };
  } catch (error) {
    console.log(error);
  }
};

// function query(sql, values) {
//     return new Promise((resolve, reject) => {
//       connection.query(sql, values, (err, rows) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(rows);
//         }
//       });
//     });
//   }
// const sortWindows = async (rows) => {
//     try {

//         const ticketsToWindows = {};
//         // let newtickets = 0;
//         // let servTickets = 0;
//         // const newSql = `SELECT * FROM facts WHERE state = 'NEW' AND idbranch = ${branchId}`;
//         // const fetchNew = await query(newSql);
//         // newtickets = fetchNew.length;
//         // const servSql = `SELECT * FROM facts WHERE state = 'INSERVICE' AND idbranch = ${branchId}`;
//         // const fetchServ = await query(servSql);
//         // servTickets = fetchServ.length;

//         for (const row of rows) {
//           const active = row.idoperator * 1 == 0 ? false : true;
//           const idoperator = row.idoperator;
//           const worktitle = row.worktitle;
//           // const operator = row.idoperator*1;
//           // console.log(operator);

//           if (!ticketsToWindows[row.winno]) {
//             ticketsToWindows[row.winno] = [];
//           }

//           ticketsToWindows[row.winno].active = active;
//           ticketsToWindows[row.winno].worktitle = worktitle;

//           if (!active) {
//             // ticketsToWindows[row.winno].active.push(row);
//             continue;
//           }
//           const op_name = await new Promise((resolve, reject) => {
//             connection.query(
//               `SELECT f_name FROM employee_list WHERE F_ID = ${idoperator}`,
//               (err, rows) => {
//                 if (err) {
//                   console.log(err);
//                   reject(err);
//                 } else {
//                   resolve(rows);
//                 }
//               }
//             );
//           });
//           // console.log(op_name);
//           ticketsToWindows[row.winno].name = op_name[0].f_name;

//           const sql = `SELECT * FROM facts WHERE windownum = ${row.winno} and idbranch = ${branchId} and state <> 'COMPLETED'`;
//           // console.log('Facts request:' + sql);

//           try {
//             const factRows = await new Promise((resolve, reject) => {
//               connection.query(sql, (err, rows) => {
//                 if (err) {
//                   console.log(err);
//                   reject(err);
//                 } else {
//                   resolve(rows);
//                 }
//               });
//             });
//             console.log(factRows);

//             // console.log('Facts response:', factRows);
//             if (!ticketsToWindows[row.winno].INSERVICE) {
//               ticketsToWindows[row.winno].INSERVICE = [];
//             }
//             if (!ticketsToWindows[row.winno].DELAYED) {
//               ticketsToWindows[row.winno].DELAYED = [];
//             }

//             if (factRows.length == 1) {
//               if (factRows[0].state == "INSERVICE") {
//                 ticketsToWindows[row.winno].INSERVICE.push(factRows[0]);
//               }
//               else if (factRows[0].state == "DELAYED") {
//                 ticketsToWindows[row.winno].DELAYED.push(factRows[0]);
//               }

//             } else {
//               factRows.forEach((factRow) => {
//                 if (factRow.state == "INSERVICE") {
//                   ticketsToWindows[row.winno].INSERVICE.push(factRow);
//                 }
//                 else if (factRow.state == "DELAYED") {
//                   ticketsToWindows[row.winno].DELAYED.push(factRow);
//                 }

//                 // ticketsToWindows[row.winno][factRow.state].push(factRow);
//               });
//             }
//             // ticketsToWindows[row.winno].active.push(active);
//             // ticketsToWindows[row.winno].push(factRows[0]);
//             // ticketsToWindows[row.winno].active = active;
//           } catch (error) {
//             console.log(error);
//             return res.status(500).json({
//               error: error.message,
//             });
//           }
//         }
//         // console.log('Windows response:', ticketsToWindows);
//         const windowsJson = Object.keys(ticketsToWindows).map((key) => {
//           const winInfo = ticketsToWindows[key];
//           const INSERVICE = winInfo.INSERVICE || [];
//           const DELAYED = winInfo.DELAYED || [];

//           return {
//             winno: key,
//             active: winInfo.active,
//             worktitle: winInfo.worktitle,
//             name: winInfo.name,
//             INSERVICE: INSERVICE.length || 0,
//             DELAYED: DELAYED.length || 0,
//             ticketTotal: INSERVICE.length + DELAYED.length,
//           };
//         });

//         return windowsJson;
//       } catch (error) {
//         console.log(error);

//       }
// }

module.exports = sortWindows;
