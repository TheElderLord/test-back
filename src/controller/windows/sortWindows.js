const connection = require("../../db/connection");
const { query } = require("./getWindows");

const sortWindows = async (branchId, windows) => {
  try {
    const ticketsToWindows = {};
    let newtickets = [];
    let servTickets = 0;

    const newResponse = await query(
      `SELECT * FROM facts WHERE state = 'NEW' AND idbranch = ${branchId}`
    );
    if (newResponse.length == 1) {
      newtickets.push(newResponse[0]);
    } else {
      newResponse.forEach((newResponse) => {
        newtickets.push(newResponse);
      });
    }

    servTickets = await query(
      `SELECT COUNT(*) as count FROM facts WHERE state = 'INSERVICE' AND idbranch = ${branchId}`
    );
    servTickets = servTickets[0].count;

    for (const key in windows) {
      const window = windows[key];
      const active = window.idoperator * 1 !== 0;
      const opId = window.idoperator;
      const worktitle = window.worktitle;

      if (!ticketsToWindows[window.winno]) {
        ticketsToWindows[window.winno] = {};
      }

      if (!ticketsToWindows[window.winno].INSERVICE) {
        ticketsToWindows[window.winno].INSERVICE = [];
      }
      if (!ticketsToWindows[window.winno].DELAYED) {
        ticketsToWindows[window.winno].DELAYED = [];
      }

      ticketsToWindows[window.winno].active = active;
      ticketsToWindows[window.winno].worktitle = worktitle;
      ticketsToWindows[window.winno].operatorId = opId;

      if (!active) {
        continue;
      }

      const nameResult = await query(
        `SELECT f_name FROM employee_list WHERE F_ID = ${opId}`
      );
      if (nameResult && nameResult.length > 0) {
        ticketsToWindows[window.winno].name = nameResult[0].f_name;
      } else {
        ticketsToWindows[window.winno].name = 'Неизвестно'; // or any default value
      }

      const insSql = `SELECT * FROM facts WHERE windownum = ${window.winno} AND idbranch = ${branchId} AND state = 'INSERVICE'`;
      const inservCount = await query(insSql);
      const delayedCount = await query(
        `SELECT * FROM facts WHERE windownum = ${window.winno} AND idbranch = ${branchId} AND state = 'DELAYED'`
      );

      if (inservCount.length == 1) {
        ticketsToWindows[window.winno].INSERVICE.push(inservCount[0]);
      } else {
        inservCount.forEach((inservCount) => {
          ticketsToWindows[window.winno].INSERVICE.push(inservCount);
        });
      }

      if (delayedCount.length == 1) {
        ticketsToWindows[window.winno].DELAYED.push(delayedCount[0]);
      } else {
        delayedCount.forEach((delayedCount) => {
          ticketsToWindows[window.winno].DELAYED.push(delayedCount);
        });
      }
    }

    const windowsJson = Object.keys(ticketsToWindows).map((key) => {
      const winInfo = ticketsToWindows[key];

      return {
        winno: key,
        operatorId: winInfo.operatorId,
        active: winInfo.active,
        worktitle: winInfo.worktitle,
        name: winInfo.name,
        INSERVICE: winInfo.INSERVICE,
        DELAYED: winInfo.DELAYED,
      };
    });

    return { windowsJson, newtickets, servTickets };
  } catch (error) {
    console.log(error);
  }
};

module.exports = sortWindows;
