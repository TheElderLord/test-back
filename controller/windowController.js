const connection = require("../db/connection");

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

exports.getWindowsById = async (req, res) => {

  const branchId = req.params.id;
  const sql = `SELECT * FROM window_state WHERE idbranch = ${branchId}`;
  // console.log('Window request:' + query);

  try {
    const rows = await new Promise((resolve, reject) => {
      connection.query(sql, (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    const ticketsToWindows = {};
    let newtickets = 0;
    let servTickets = 0;
    const newSql = `SELECT * FROM facts WHERE state = 'NEW' AND idbranch = ${branchId}`;
    const fetchNew = await query(newSql);
    newtickets = fetchNew.length;
    const servSql = `SELECT * FROM facts WHERE state = 'INSERVICE' AND idbranch = ${branchId}`;
    const fetchServ = await query(servSql);
    servTickets = fetchServ.length;

    for (const row of rows) {
      const active = row.idoperator * 1 == 0 ? false : true;
      const idoperator = row.idoperator;
      const worktitle = row.worktitle;
      // const operator = row.idoperator*1;
      // console.log(operator);

      if (!ticketsToWindows[row.winno]) {
        ticketsToWindows[row.winno] = [];
      }

      ticketsToWindows[row.winno].active = active;
      ticketsToWindows[row.winno].worktitle = worktitle;

      if (!active) {
        // ticketsToWindows[row.winno].active.push(row);
        continue;
      }
      const op_name = await new Promise((resolve, reject) => {
        connection.query(
          `SELECT f_name FROM employee_list WHERE F_ID = ${idoperator}`,
          (err, rows) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve(rows);
            }
          }
        );
      });
      // console.log(op_name);
      ticketsToWindows[row.winno].name = op_name[0].f_name;

     
      const sql = `SELECT * FROM facts WHERE windownum = ${row.winno} and idbranch = ${branchId} and state <> 'COMPLETED'`;
      // console.log('Facts request:' + sql);

      try {
        const factRows = await new Promise((resolve, reject) => {
          connection.query(sql, (err, rows) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve(rows);
            }
          });
        });

        // console.log('Facts response:', factRows);
        if (!ticketsToWindows[row.winno].INSERVICE) {
          ticketsToWindows[row.winno].INSERVICE = [];
        }
        if (!ticketsToWindows[row.winno].DELAYED) {
          ticketsToWindows[row.winno].DELAYED = [];
        }
        

        if (factRows.length == 1) {
          if (factRows[0].state == "INSERVICE") {
            ticketsToWindows[row.winno].INSERVICE.push(factRows[0]);
          }
          else if (factRows[0].state == "DELAYED") {
            ticketsToWindows[row.winno].DELAYED.push(factRows[0]);
          }
         
        } else {
          factRows.forEach((factRow) => {
            if (factRow.state == "INSERVICE") {
              ticketsToWindows[row.winno].INSERVICE.push(factRow);
            }
            else if (factRow.state == "DELAYED") {
              ticketsToWindows[row.winno].DELAYED.push(factRow);
            }
            
            // ticketsToWindows[row.winno][factRow.state].push(factRow);
          });
        }
        // ticketsToWindows[row.winno].active.push(active);
        // ticketsToWindows[row.winno].push(factRows[0]);
        // ticketsToWindows[row.winno].active = active;
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          error: error.message,
        });
      }
    }
    // console.log('Windows response:', ticketsToWindows);
    const windowsJson = Object.keys(ticketsToWindows).map((key) => {
      const winInfo = ticketsToWindows[key];
      const INSERVICE = winInfo.INSERVICE || [];
      const DELAYED = winInfo.DELAYED || [];
      
      return {
        winno: key,
        active: winInfo.active,
        worktitle: winInfo.worktitle,
        name: winInfo.name,
        INSERVICE: INSERVICE.length || 0,
        DELAYED: DELAYED.length || 0,
        ticketTotal: INSERVICE.length + DELAYED.length,
      };
    });

    return res.status(200).json({
      message: "Success",
      count: rows.length,
      newtickets: newtickets,
      serving: servTickets,
      windows: windowsJson,
      
    
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};
exports.getWindows = async (req, res) => {
  

  try {
    const rows = await query("SELECT * FROM window_state");
    return res.status(200).json({
      size: rows.length,
      data: rows,
    });
  } catch (err) {
    console.log(err);
  }
};
