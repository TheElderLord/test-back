const connection = require("../db/connection");

exports.getServices = (req, res) => {
    connection.query("SELECT * FROM services_list", (err, rows) => {
        if (err) throw err;
        res.status(200).json({
            size: rows.length,
            data: rows,
        });
    });
};