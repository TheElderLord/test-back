const connection = require('../db/connection');

exports.getTickets = (req, res) => {

    connection.query('SELECT * FROM facts', (err, rows, fields) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: err.message
            });
        
        };
        const alarm = [];
        const serviceTickets = {};
        rows.forEach(row => {
            const servover = row.servover;
            const waitover = row.waitover;
            const rate = row.rating;
            const serviceName = row.servicename;
            try {
                if (servover == "true" || waitover == "true" || rate == 2 || rate == 1) {
                    alarm.push(row);
                }
                if (!serviceTickets[serviceName]) {
                    serviceTickets[serviceName] = [];
                }
                serviceTickets[serviceName].push(row);
            } catch (err) {
                console.log(err);
            }
        });
        const responseArray = Object.keys(serviceTickets).map(serviceName => ({
            servicename: serviceName,
            length: serviceTickets[serviceName].length,
            rows: serviceTickets[serviceName]
        }));

        const data = {
            message: 'Success',
            length: rows.length,
            rows: rows,
            alarm: alarm,
            serviceTickets: responseArray
        };
        res.status(200).json(data);
    });
};