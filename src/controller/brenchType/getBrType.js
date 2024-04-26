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
      if (F_BRANCH_ID === null || F_START_WORK_TIME === null || new Date(F_START_WORK_TIME) < today) {
        return;
      }

      if (!branchMap[F_BRANCH_ID] ) {
        branchMap[F_BRANCH_ID] = [];
      }

      let start = new Date(F_START_WORK_TIME);
      // let end = F_STOP_WORK_TIME !== null ? new Date(F_STOP_WORK_TIME) : new Date();
      let end = F_STOP_WORK_TIME === null ? new Date() : new Date(F_STOP_WORK_TIME)  ;
      // If start time is earlier than today, set it to today at 9 am
      if (start < today) {
        start = today;
      }

      

      branchMap[F_BRANCH_ID].push({start,end,menutype:F_NAME});
    
    
      return branchMap;

      // Store the timeline for the branch if it doesn't exist or if it's fresher than the existing one
     
    });

    // Convert the branchMap to the desired format
    
  } catch (err) {
    console.log(err);
  }
};

module.exports = brType;
