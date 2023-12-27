const connection = require('../../db/connection');


const getAllTickets = async (login) => {
    if (login !== "admin") {
        const user_branches = await query(`SELECT id_branch FROM users WHERE login = '${login}'`);

        // Extracting an array of branch IDs
        const branchIds = user_branches.map(e => e.id_branch);

        if (branchIds.length === 0) {
            // Handle the case when there are no branches
            return [];
        }

        console.log(branchIds);

        const sql = `SELECT * FROM facts WHERE idbranch IN (${branchIds.join(',')}) AND state <> 'ZOMBIE' AND state <> 'MISSED'`;

        const tickets = await query(sql);
        return tickets;
    }


    const sql = `SELECT * FROM facts where state <> 'ZOMBIE' and state <> 'MISSED'`;
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
