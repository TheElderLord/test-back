const getServiceTicket = require("../ticket/getServiceTicket");
const getTickets = require("../ticket/getTickets");

const getAverageWaitTime = require("./averageWaitTime");

const getAverageServTime = require("./averageServeTime");
const waitOver = require("./waitOver");

const getPeakHours = require("./peakHours");
const averageServHours = require("./averageServHours");
const averageWaitHours = require("./averageWaitHours");

const analytics = async (req, res) => {
  const username = req.user;
  const branch_id = req.params.id;
  console.log(branch_id);
  let tickets;
  if(branch_id){
    tickets =  await getTickets(username,branch_id);
  }
  else tickets = await getTickets(username);

  
  // console.log(tickets)
  const servTicketsJson = await getServiceTicket(tickets);
  const servTickets = servTicketsJson.data;
  // console.log(servTickets);
  const averageWaitTime = await getAverageWaitTime(servTickets);
  const averageServeTime = await getAverageServTime(servTickets);
  const waitOv = await waitOver(servTickets);
  const peakHours = await getPeakHours(tickets);
  const averageServ = await averageServHours(tickets);
  const averageWait = await averageWaitHours(tickets);
  return res.status(200).json({
    message: "Success",
    data: {
      averageWaitTime,
      averageServeTime,
      waitOv,
      peakHours,
      averageServ,
      averageWait,
    },
  });
};

module.exports = { analytics };
