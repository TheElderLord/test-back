const nomadQuery = require("../../db/nomadConnection");

const brType = async (id) => {
  let sql = `SELECT brt.F_BRANCH_ID, brt.F_START_WORK_TIME, brt.F_STOP_WORK_TIME, br.F_NAME FROM kgd.t_br_type_report brt
    RIGHT JOIN t_branch_type br ON brt.F_BR_TYPE_ID = br.F_ID;`;
  if (id) {
    sql = `SELECT brt.F_BRANCH_ID, brt.F_START_WORK_TIME, brt.F_STOP_WORK_TIME, br.F_NAME FROM kgd.t_br_type_report brt
    RIGHT JOIN t_branch_type br ON brt.F_BR_TYPE_ID = br.F_ID where brt.F_BRANCH_ID = ${id};`;
  }
  try {
    const branchMap = {};
    const data = await nomadQuery(sql);

    const today = new Date(); // Get today's date
    today.setHours(9, 0, 0, 0); // Set the time to 9:00 AM

    data.forEach((entry) => {
      const { F_BRANCH_ID, F_START_WORK_TIME, F_STOP_WORK_TIME, F_NAME } =
        entry;

      if (!branchMap[F_BRANCH_ID]) {
        branchMap[F_BRANCH_ID] = [];
      }
      console.log(F_BRANCH_ID);
      const today = new Date();
      let start = new Date(F_START_WORK_TIME);
      let end;
      console.log(start)
      if (
        start.getFullYear() === today.getFullYear() &&
        start.getMonth() === today.getMonth() &&
        start.getDate() === today.getDate()
      ) {
        start = start.getHours() + ":" + start.getMinutes();
        end = F_STOP_WORK_TIME ? new Date(F_STOP_WORK_TIME) : new Date();
        end = end.getHours() + ":" + end.getMinutes();
        branchMap[F_BRANCH_ID].push({ start, end, menutype: F_NAME });
      }
      if (!F_STOP_WORK_TIME) {
        if (
          start.getFullYear() < today.getFullYear() &&
          start.getMonth() < today.getMonth() &&
          start.getDate() < today.getDate()
        ) {
          start = "09:00";
        }
        start = start.getHours() + ":" + start.getMinutes();
        end = F_STOP_WORK_TIME ? new Date(F_STOP_WORK_TIME) : new Date();
        end = end.getHours() + ":" + end.getMinutes();
        branchMap[F_BRANCH_ID].push({ start, end, menutype: F_NAME });
      }

      // If start time is today, set it to today at 9 am

      // If end time is null or if start is today, set end time to current time
    });

    // Log and return branchMap
    const result = {};
    for (const branchId in branchMap) {
      result[`branchId: ${branchId}`] = branchMap[branchId];
    }

    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = brType;
