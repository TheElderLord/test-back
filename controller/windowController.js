const connection = require("../db/connection");

exports.getWindows = async (req, res) => {
    const branchId = req.params.id;
    const query = `SELECT * FROM window_state WHERE idbranch = ${branchId}`;
    // console.log('Window request:' + query);

    try {
        const rows = await new Promise((resolve, reject) => {
            connection.query(query, (err, rows) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    
        const ticketsToWindows = {};

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
                connection.query(`SELECT f_name FROM employee_list WHERE F_ID = ${idoperator}`, (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });
            console.log(op_name);
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
                    if (factRows[0].state == "DELAYED") {
                        ticketsToWindows[row.winno].DELAYED.push(factRows[0]);
                    }


                }
                else {
                    factRows.forEach(factRow => {

                        if (factRow.state == "INSERVICE") {
                            ticketsToWindows[row.winno].INSERVICE.push(factRow);
                        }
                        if (factRow.state == "DELAYED") {
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
                    error: error.message
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
                INSERVICE: {
                    // rows: INSERVICE,
                    length: INSERVICE.length || 0,
                },
                DELAYED: {
                    // rows: DELAYED,
                    length: DELAYED.length || 0,
                },
                ticketTotal: INSERVICE.length + DELAYED.length,
            };
        });


        return res.status(200).json({
            message: 'Success',
            count: rows.length,
            data: {
                windows: windowsJson,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message
        });
    }
};
