const connection = require('../db/connection');

exports.getTickets = async (req, res) => {
    
    try {
        const rows = await query('SELECT * FROM facts');

        const alarm = {};
        const serviceTickets = {};
        const branchTicketsArray = [];
        const states = {};

        await Promise.all(
            rows.map(async (row) => {
                const servover = row.servover;
                const waitover = row.waitover;
                const rate = row.rating;

                const serviceName = row.servicename;
                const branchId = row.idbranch;
                const state = row.state;

                try {
                    if (servover === "true") {
                        if (!alarm["servover"]) {
                            alarm["servover"] = [];
                        }
                        alarm["servover"].push(row);
                    }
                    if (waitover === "true") {
                        if (!alarm["waitover"]) {
                            alarm["waitover"] = [];
                        }
                        alarm["waitover"].push(row);
                    }
                    if (rate * 1 == 2 || rate * 1 == 1) {
                        if (!alarm["rate"]) {
                            alarm["rate"] = [];
                        }
                        alarm["rate"].push(row);
                    }

                    if (!states[state]) {
                        states[state] = [];
                    }

                    if (!serviceTickets[serviceName]) {
                        serviceTickets[serviceName] = [];
                    }

                    if (!branchTicketsArray[branchId]) {
                        branchTicketsArray[branchId] = [];
                    }

                    branchTicketsArray[branchId].push(row);
                    serviceTickets[serviceName].push(row);
                    states[state].push(row);
                } catch (err) {
                    console.log(err);
                }
            })
        );


        const serviceJson = {
            totalLength: Object.values(serviceTickets).reduce((acc, service) => acc + service.length, 0),
            data: Object.keys(serviceTickets).map((serviceName) => ({
                servicename: serviceName,
                length: serviceTickets[serviceName].length,
                // rows: serviceTickets[serviceName],
            })),
        };





        const branchArray = Object.keys(branchTicketsArray).map(async (branchId) => {
            const branchNameResult = await query('SELECT F_NAME FROM branches WHERE F_ID = ?', [branchId]);
            const branchName = branchNameResult[0].F_NAME;
            const totalLength = branchTicketsArray.reduce((acc, branch) => acc + branch.length, 0);
            // const branchTickets = branchTicketsArray[branchId].map((ticket) => {
            //     const {  idbranch, servicename, servover, waitover, rating } = ticket;

            // });
            return {
                totalLength: totalLength,
                data: {
                    branchId: branchId,
                    branchName: branchName,
                    length: branchTicketsArray[branchId].length,
                }
                // rows: branchTicketsArray[branchId],
            };
        });

        const alarmJson = {
            totalLength: Object.values(alarm).reduce((acc, alarm) => acc + alarm.length, 0),
            data: Object.keys(alarm).map((alarmName) => ({
                alarmName: alarmName,
                length: alarm[alarmName].length,
                // rows: alarm[alarmName],
            })),

        }



        const stateJson = {
            totalLength: Object.values(states).reduce((acc, state) => acc + state.length, 0),
            data: Object.keys(states).map((stateName) => ({
                stateName: stateName,
                length: states[stateName].length,
                // rows: states[stateName],
            })),
        };


        const branchTickets = await Promise.all(branchArray);

        const data = {
            message: 'Success',
            count: rows.length,
            data: {
                alarm: alarmJson,
                serviceTickets: serviceJson,
                branchTickets: branchTickets,
                states: stateJson,
            },
        };

        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.message,
        });
    }
};

exports.getTicketsByBranchId = async (req, res) => {
    const id = req.params.id;
    if(id){
        
        try {
            const rows = await query('SELECT * FROM facts WHERE idbranch = ?', [id]);
            const alarm = {};
            const serviceTickets = {};
            const branchTicketsArray = [];
            const states = {};
    
            await Promise.all(
                rows.map(async (row) => {
                    const servover = row.servover;
                    const waitover = row.waitover;
                    const rate = row.rating;
    
                    const serviceName = row.servicename;
                    const branchId = row.idbranch;
                    const state = row.state;
    
                    try {
                        if (servover === "true") {
                            if (!alarm["servover"]) {
                                alarm["servover"] = [];
                            }
                            alarm["servover"].push(row);
                        }
                        if (waitover === "true") {
                            if (!alarm["waitover"]) {
                                alarm["waitover"] = [];
                            }
                            alarm["waitover"].push(row);
                        }
                        if (rate * 1 == 2 || rate * 1 == 1) {
                            if (!alarm["rate"]) {
                                alarm["rate"] = [];
                            }
                            alarm["rate"].push(row);
                        }
    
                        if (!states[state]) {
                            states[state] = [];
                        }
    
                        if (!serviceTickets[serviceName]) {
                            serviceTickets[serviceName] = [];
                        }
    
                        if (!branchTicketsArray[branchId]) {
                            branchTicketsArray[branchId] = [];
                        }
    
                        branchTicketsArray[branchId].push(row);
                        serviceTickets[serviceName].push(row);
                        states[state].push(row);
                    } catch (err) {
                        console.log(err);
                    }
                })
            );
    
    
            const serviceJson = {
                totalLength: Object.values(serviceTickets).reduce((acc, service) => acc + service.length, 0),
                data: Object.keys(serviceTickets).map((serviceName) => ({
                    servicename: serviceName,
                    length: serviceTickets[serviceName].length,
                    // rows: serviceTickets[serviceName],
                })),
            };
    
    
    
    
    
            const branchArray = Object.keys(branchTicketsArray).map(async (branchId) => {
                const branchNameResult = await query('SELECT F_NAME FROM branches WHERE F_ID = ?', [branchId]);
                const branchName = branchNameResult[0].F_NAME;
                const totalLength = branchTicketsArray.reduce((acc, branch) => acc + branch.length, 0);
                // const branchTickets = branchTicketsArray[branchId].map((ticket) => {
                //     const {  idbranch, servicename, servover, waitover, rating } = ticket;
    
                // });
                return {
                    totalLength: totalLength,
                    data: {
                        branchId: branchId,
                        branchName: branchName,
                        length: branchTicketsArray[branchId].length,
                    }
                    // rows: branchTicketsArray[branchId],
                };
            });
    
            const alarmJson = {
                totalLength: Object.values(alarm).reduce((acc, alarm) => acc + alarm.length, 0),
                data: Object.keys(alarm).map((alarmName) => ({
                    alarmName: alarmName,
                    length: alarm[alarmName].length,
                    // rows: alarm[alarmName],
                })),
    
            }
    
    
    
            const stateJson = {
                totalLength: Object.values(states).reduce((acc, state) => acc + state.length, 0),
                data: Object.keys(states).map((stateName) => ({
                    stateName: stateName,
                    length: states[stateName].length,
                    // rows: states[stateName],
                })),
            };
    
    
            // const branchTickets = await Promise.all(branchArray);
    
            const data = {
                message: 'Success',
                count: rows.length,
                data: {
                    alarm: alarmJson,
                    serviceTickets: serviceJson,
                    // branchTickets: branchTickets,
                    states: stateJson,
                },
            };
    
            res.status(200).json(data);
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: err.message,
            });
        }
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
