const nomadQuery = require("../../db/nomadConnection");

const brType = async () => {
  const sql = `SELECT brt.F_BRANCH_ID, brt.F_START_WORK_TIME,brt.F_STOP_WORK_TIME,br.F_NAME FROM kgd.t_br_type_report brt
    left join t_branch_type br
    on brt.F_BR_TYPE_ID = br.F_ID;`;
  try {
    const branchMap = new Map(); 
    const data = await nomadQuery(sql);
    data.forEach((entry) => {
      const { F_BRANCH_ID, F_START_WORK_TIME, F_STOP_WORK_TIME } = entry;

      // Check if the branch exists in the map
      if (!branchMap.has(F_BRANCH_ID)) {
        // If the branch doesn't exist, initialize it with an empty array
        branchMap.set(F_BRANCH_ID, []);
      }

      // Push the start and stop times to the array for the branch
      branchMap
        .get(F_BRANCH_ID)
        .push({ start: F_START_WORK_TIME, stop: F_STOP_WORK_TIME });
    });

    // Convert Map to array of objects and sort by branch ID
    const result = [...branchMap].map(([branchId, times]) => ({
      branchId,
      times: times.sort((a, b) => a.start - b.start), // Sort times in ascending order
    }));
    // console.log(result)
    return result.slice(0,3);
  } catch (err) {
    console.log(err);
  }
};

module.exports = brType;
