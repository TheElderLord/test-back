const query = require("../../db/connection");
const getBranchList = require("../branch/getBranches");

const getRatingTicket = async (login) => {
  try {
    const branches = await getBranchList(login);
    const branchTicketsArray = {};

    for (const branch of branches) {
      if (!branchTicketsArray[branch.F_NAME]) {
        branchTicketsArray[branch.F_NAME] = {
          PERFECT: 0,
          BAD: 0,
        };
      }

      const childIds = branch.children.map((child) => child.F_ID).join(",");
      const sql = `SELECT rating FROM facts WHERE idbranch IN (${childIds})`;
      const response = await query(sql);

      response.forEach((rating) => {
        if (rating.rating === "5") {
          branchTicketsArray[branch.F_NAME].PERFECT++;
        } else if (rating.rating === "2" || rating.rating === "1") {
          branchTicketsArray[branch.F_NAME].BAD++;
        }
      });
    }

    const resultObject = Object.keys(branchTicketsArray).map((branchName) => {
      return {
        name: branchName,
        tickets: {
          PERFECT: branchTicketsArray[branchName].PERFECT,
          BAD: branchTicketsArray[branchName].BAD,
        },
      };
    });

    return resultObject;
  } catch (err) {
    console.error(err);
    throw err; // Propagate the error
  }
};

module.exports = getRatingTicket;
