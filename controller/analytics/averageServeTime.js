const connection = require('../../db/connection');

const getAverageServTime = async (branches) => {
  const resultArray = [];
  let totalServT = 0;

  for (const branch of branches) {
    const branchName = branch.F_NAME;
    const branchData = {
      branchName,
      totalAverageServTime: 0,
      childBranches: [],
    };

    for (const child of branch.children) {
      const childName = child.F_NAME;
      const childData = {
        childName,
        averageServTime: 0,
      };

      const id = child.F_ID;
      const tickets = await query(`SELECT * FROM facts WHERE idbranch = ${id}`);

      if (tickets.length > 0) {
        let totalServTime = 0;

        tickets.forEach((ticket) => {
          const start = ticket.startservtime;
          const end = ticket.stopservtime;
          const diff = end - start;
          const diffInMinutes = diff / 60000;
          totalServTime += diffInMinutes;
        });

        // let avgW = ;
        // if(avgW > 60){
        //     avgW/=60;
        // }
        childData.averageServTime = Math.round(Math.abs(totalServTime / tickets.length)*100)/100;

        branchData.childBranches.push(childData);
        branchData.totalAverageServTime += childData.averageServTime;
      }
    }

    if (branch.children.length > 0) {
      branchData.totalAverageServTime /= branch.children.length;
    }
    branchData.totalAverageServTime = Math.round(branchData.totalAverageServTime*100)/100;
    totalServT += branchData.totalAverageServTime;

    resultArray.push(branchData);
  }

  return {
    total: Math.round(totalServT*100)/100,
    branches: resultArray,
  };
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

module.exports = getAverageServTime;
