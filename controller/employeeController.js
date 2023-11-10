const connection = require("../db/connection");

exports.getEmployees = (req, res) => {
  connection.query(
    "SELECT `id`,`F_ID`,`F_NAME`,`F_PATRONIMIC`,`F_SURNAME`,`F_WORK_NAME`,`startTime`,`F_BRANCH_ID`,`F_DESCR` FROM employee_list",
    (err, rows) => {
      if (err) throw err;
      res.send(rows);
    }
  );
};
