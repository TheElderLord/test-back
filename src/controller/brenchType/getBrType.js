// const nomadQuery = require("../../db/nomadConnection");

// const brType = async () => {
//    const sql = `SELECT brt.F_BRANCH_ID, brt.F_START_WORK_TIME, brt.F_STOP_WORK_TIME, br.F_NAME FROM kgd.t_br_type_report brt
//      RIGHT JOIN t_branch_type br ON brt.F_BR_TYPE_ID = br.F_ID;`;
//   // const sql = `SELECT * FROM kgd.t_br_type_report where F_BRANCH_ID= 3012;`;
//   try {
//     const branchMap = {};
//     const data = await nomadQuery(sql);
//     // console.log(data);
//     data.map(entry=>{
      
//       const { F_BRANCH_ID, F_START_WORK_TIME, F_STOP_WORK_TIME,F_NAME } = entry;
//       // console.log(F_START_WORK_TIME,F_STOP_WORK_TIME );
//       const start = new Date(F_START_WORK_TIME).toLocaleString();
//       const end = F_STOP_WORK_TIME !== null ? new Date(F_STOP_WORK_TIME).toLocaleString("ru-RU") : null;
//       if(!branchMap[F_BRANCH_ID]){
//         branchMap[F_BRANCH_ID] = [];
//       }
//       branchMap[F_BRANCH_ID].push({start,end});
//     })
//     return branchMap;
    
//   } catch (err) {
//     console.log(err);
//   }
// };

// module.exports = brType;

