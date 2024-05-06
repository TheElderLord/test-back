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

      const start = new Date(F_START_WORK_TIME);
      let end = F_STOP_WORK_TIME ? new Date(F_STOP_WORK_TIME) : new Date();

      // Format start and end times
      const formattedStart = formatTime(start);
      const formattedEnd = formatTime(end);

      // Push formatted data to branchMap
      branchMap[F_BRANCH_ID].push({ start: formattedStart, end: formattedEnd, menutype: F_NAME });
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

// Function to format time with leading zero for minutes less than 10
const formatTime = (time) => {
  const hours = time.getHours();
  const minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
  return hours + ":" + minutes;
};

module.exports = brType;
