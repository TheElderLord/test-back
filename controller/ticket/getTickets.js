const connection = require('../../db/connection');


const getAllTickets = async(id) =>{
    if(id){
        const sql = `SELECT * FROM facts WHERE idbranch = ? and state <> 'ZOMBIE'`;
        const tickets = await query(sql, id);
        return tickets;
    }
    const sql = `SELECT * FROM facts where state <> 'ZOMBIE'`;
    const tickets = await query(sql);
    return tickets;
} 



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

module.exports = getAllTickets;
