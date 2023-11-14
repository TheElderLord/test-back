
const connection = require('../db/connection');


exports.getRoles = async (req, res) => {
    try {
       connection.query('SELECT `id`,`F_ID`,`F_NAME`,`F_QUEUE_ID` FROM role', (err, rows) => {
        if (err) throw err;
        res.status(200).json({
            size: rows.length,
            data: rows,
        });
    } );

    } catch (err) {
        console.log(err);
    }
}
