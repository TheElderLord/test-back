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
                    if (servover === "true"  ) {
                        if(!alarm["servover"]){
                            alarm["servover"] = [];
                        }
                        alarm["servover"].push(row);
                    }
                    if( waitover === "true"){
                        if(!alarm["waitover"]){
                            alarm["waitover"] = [];
                        }
                        alarm["waitover"].push(row);
                    }
                    if(rate*1 == 2 || rate*1 == 1){
                        if(!alarm["rate"]){
                            alarm["rate"] = [];
                        }
                        alarm["rate"].push(row);
                    }

                    if(!states[state]) {
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

        const responseArray = Object.keys(serviceTickets).map((serviceName) => ({
            servicename: serviceName,
            length: serviceTickets[serviceName].length,
            rows: serviceTickets[serviceName],
        }));

        const branchArray = Object.keys(branchTicketsArray).map(async (branchId) => {
            const branchNameResult = await query('SELECT F_NAME FROM branches WHERE F_ID = ?', [branchId]);
            const branchName = branchNameResult[0].F_NAME;
            // const branchTickets = branchTicketsArray[branchId].map((ticket) => {
            //     const {  idbranch, servicename, servover, waitover, rating } = ticket;
                
            // });
              return {
                branchId: branchId,
                branchName: branchName,
                length: branchTicketsArray[branchId].length,
                rows: branchTicketsArray[branchId],
            };
        });
        const statesArray = Object.keys(states).map((state) => ({
            state: state,
            length: states[state].length,
            rows: states[state],
        }));


        const branchTickets = await Promise.all(branchArray);

        const data = {
            message: 'Success',
            length: rows.length,
            data: {
                alarm: alarm,
                serviceTickets: responseArray,
                branchTickets: branchTickets,
                states: statesArray,
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
