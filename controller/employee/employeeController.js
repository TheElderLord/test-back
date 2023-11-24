const connection = require("../../db/connection");
const getEmployees = require('./getEmployee');
const findTimeDifference = require('./findTimeDifference');

// exports.getEmployees = (req, res) => {
//   connection.query(
//     "SELECT `id`,`F_ID`,`F_NAME`,`F_PATRONIMIC`,`F_SURNAME`,`F_WORK_NAME`,`startTime`,`F_BRANCH_ID`,`F_DESCR` FROM employee_list",
//     (err, rows) => {
//       if (err) throw err;
//       res.status(200).json({
//         size:rows.length,
//         data:rows
//     });
//     }
//   );
// };

exports.getEmployeeById = async (req, res) => {
    const branchId = req.params.id;
    const employees = await getEmployees(branchId);
    const employeesWithTimeDifference = await findTimeDifference(employees);
    res.status(200).json({
        size:employeesWithTimeDifference.length,
        data:employeesWithTimeDifference
    });
  
};
