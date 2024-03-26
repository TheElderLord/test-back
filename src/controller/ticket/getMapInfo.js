const { error } = require("console");
const query = require("../../db/connection");
const getBranches = require("../branch/getBranches")
const getTickets = require("./getTickets")

const getMapInfo = async (login, branch_id) => {

  try {
    let resultObject = {
      averageRate: 0,
      onlineServers: "",
      tickets: 0
    }
    let online = 0;
    let totalServers = 0;
    let tickets = await getTickets(login, branch_id);
    let branches = await getBranches(login);
    let branch = findBranchById(branches, branch_id);
    if (branch_id) {
      tickets = await getTickets(login, branch_id);
      branch = findBranchById(branches, branch_id);
      online = 0;
      totalServers = 0;
      branch.children.map(e => {
        if (e.ONN === "1") {
          online++;
        }
        totalServers++;
      })
    }
    else {
      tickets = await getTickets(login);
      // branch = findBranchById(branches);
      online = 0;
      totalServers = 0;
      branches.map(e => {
        e.children.map(el=>{
          if (el.ONN === "1") {
            online++;
          }
          totalServers++;
        })
        
      })
    }


    let perfect = 0;
    let bad = 0;
    let total = 0;
    tickets.map(e => {
      if (e.rating === "5") {
        perfect++;
      }
      else if (e.rating === "2") {
        bad++;
      }
      total++;
    })

    resultObject.averageRate = (((perfect * 5) + (bad * 2)) / total).toFixed(2);
    resultObject.tickets = tickets.length;
    resultObject.onlineServers = online + "/" + totalServers;

    return resultObject;


  } catch (err) {
    console.log(err);
  }

};
function findBranchById(rootBranches, id) {
  for (const branch of rootBranches) {
    if (branch.F_ID === id) {
      return branch;
    }
    if (branch.children) {
      const foundInChildren = findBranchById(branch.children, id);
      if (foundInChildren) {
        return foundInChildren;
      }
    }
  }
  return null;
}

module.exports = getMapInfo;
