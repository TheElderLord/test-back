const connection = require('../../db/connection');

const getServiceTicket = require('../ticket/getServiceTicket');
const getTickets = require('../ticket/getTickets');

const getAverageWaitTime = require('./averageWaitTime');

const getAverageServTime = require('./averageServeTime');
const waitOver = require('./waitOver');

const getPeakHours =  require('./peakHours');
const averageServHours = require('./averageServHours');
const averageWaitHours = require('./averageWaitHours');

const analytics = async (req, res) => {
    const tickets = await getTickets();
    const servTicketsJson = await getServiceTicket(tickets);
    const servTickets = servTicketsJson.data;
    // console.log(servTickets);
    const averageWaitTime = await getAverageWaitTime(servTickets);
    const averageServeTime = await getAverageServTime(servTickets);
    const waitOv = await waitOver(servTickets);
    const peakHours = await getPeakHours(tickets);
    const averageHours = await averageServHours(tickets);
    const averageWait = await averageWaitHours(tickets);
    return res.status(200).json({
        message:'Success',
        data:{
            averageWaitTime,
            averageServeTime,
            waitOv,
            peakHours,
            averageHours,
            averageWait
        }
    });
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

module.exports = {analytics,query};
