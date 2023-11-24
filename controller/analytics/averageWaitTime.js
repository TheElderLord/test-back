


const getAverageWaitTime = async (facts) => {
}

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
module.exports = getAverageWaitTime;

//Wait time per branches
// const connection = require('../../db/connection');

// const getAverageWaitTime = async (branches) => {
//   const resultArray = [];
//   let totalWaitT = 0;
//   for (const branch of branches) {
//     const branchName = branch.F_NAME;
//     const branchData = {
//       branchName,
//       totalAverageWaitTime: 0,
//       childBranches: [],
//     };

//     for (const child of branch.children) {
//       const childName = child.F_NAME;
//       const childData = {
//         childName,
//         averageWaitTime: 0,
//       };

//       const id = child.F_ID;
//       const tickets = await query(`SELECT * FROM facts WHERE idbranch = ${id}`);

//       if (tickets.length > 0) {
//         let totalWaitTime = 0;

//         tickets.forEach((ticket) => {
//           const start = ticket.starttime;
//           const end = ticket.startservtime;
//           const diff = end - start;
//           const diffInMinutes = diff / 60000;
//           totalWaitTime += diffInMinutes;
//         });

//         // let avgW = ;
//         // if(avgW > 60){
//         //     avgW/=60;
//         // }
//         childData.averageWaitTime = Math.round(Math.abs(totalWaitTime / tickets.length)*100)/100;

//         branchData.childBranches.push(childData);
//         branchData.totalAverageWaitTime += childData.averageWaitTime;
//       }
//     }

//     if (branch.children.length > 0) {
//       branchData.totalAverageWaitTime /= branch.children.length;
//     }
//     branchData.totalAverageWaitTime = Math.round(branchData.totalAverageWaitTime*100)/100;
//     totalWaitT += branchData.totalAverageWaitTime;

//     resultArray.push(branchData);

//   }

//   return {
//     total: Math.round(totalWaitT*100)/100,
//     branches: resultArray,
//   };
// };



// module.exports = getAverageWaitTime;
