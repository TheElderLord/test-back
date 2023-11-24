const connection = require('../../db/connection');

const getEmployees = async (branchId) => {
    // console.log(branchId);
    try {
        const rows = await query('SELECT `id`,`F_ID`,`F_NAME`,`F_PATRONIMIC`,`F_SURNAME`,`F_WORK_NAME`,`startTime`,`F_BRANCH_ID`,`F_DESCR` FROM employee_list WHERE F_BRANCH_ID = ?', [branchId]);
        // console.log(rows);
        return rows;
    } catch (err) {
        throw err;
    }
};

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

module.exports = getEmployees;