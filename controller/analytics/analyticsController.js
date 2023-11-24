const getBranches = require('../branch/getBranches');
const getAverageWaitTime = require('./averageWaitTime');
const connection = require('../../db/connection');

const getAverageServTime = require('./averageServeTime');
const waitOver = require('./waitOver');

const analytics = async (req, res) => {
    const branches = await getBranches();
    const averageWaitTime = await getAverageWaitTime(branches);
    const averageServeTime = await getAverageServTime(branches);
    const waitOv = await waitOver(branches);
    return res.status(200).json({
        message:'Success',
        data:{
            averageWaitTime,
            averageServeTime,
            waitOv
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
