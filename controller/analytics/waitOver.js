const { get } = require('http');
const connection = require('../../db/connection');

const getWaitOver = async (branches) => {
  const resultArray = [];
  let waitOver = 0;

  for (const branch of branches) {
    const branchName = branch.F_NAME;
    const branchData = {
      branchName,
      waitOv: 0,
      childBranches: [],
    };

    for (const child of branch.children) {
      const childName = child.F_NAME;
      const childData = {
        childName,
        waitOv: 0,
      };

      const id = child.F_ID;
      const tickets = await query(`SELECT * FROM facts WHERE idbranch = ${id}`);

      if (tickets.length > 0) {
        let totalServTime = 0;

        tickets.forEach((ticket) => {
          const waitover = ticket.waitover;
          const servover = ticket.servover;
          const rating = ticket.rating;
          if(waitover == "true" || servover == "true" || rating == 1 || rating == 2){
            childData.waitOv++;
          }
        });

        // let avgW = ;
        // if(avgW > 60){
        //     avgW/=60;
        // }
        branchData.childBranches.push(childData);
        branchData.waitOv += childData.waitOv;
      }
    }

    // if (branch.children.length > 0) {
    //   branchData.waitOv /= branch.children.length;
    // }
   
    waitOver += branchData.waitOv;

    resultArray.push(branchData);
  }

  return {
    total: waitOver,
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

module.exports = getWaitOver;
