const averageServHours = async (tickets) => {
  const result = {};
  try {
    tickets.forEach((ticket) => {
      const start = ticket.startservtime * 1;
      const date = new Date(start);
      const hour = date.getHours();
      const minute = date.getMinutes();

      const state = ticket.state;

      // const key = `${hour}:${minutes <= 30 ? '00' : '30'}`;
      const key = `${hour}:${minute < 10 ? "0" + minute : minute}`;
      if (!result[key]) {
        result[key] = {
          time: key,
          count: 0,
          ticketCount: 0,
        };
      }
      if (state === "INSERVICE") {
        const endtime = new Date();
        const diff = endtime - start;
        const formatDiff = diff / 60000;
        result[key].count += formatDiff;
        result[key].ticketCount++;
      } else if (state === "COMPLETED") {
        const endtime = ticket.stopservtime;
        const diff = endtime - start;
        const formatDiff = diff / 60000;
        result[key].count += formatDiff;
        result[key].ticketCount++;
      }
    });

    const resultArray = Object.values(result).sort((a, b) => {
      const timeA = a.time.split(":").map(Number);
      const timeB = b.time.split(":").map(Number);

      if (timeA[0] !== timeB[0]) {
        return timeA[0] - timeB[0];
      } else {
        return timeA[1] - timeB[1];
      }
    });

    const resultObject = Object.keys(resultArray).map((key) => {
      const count = resultArray[key].count;
      const ticketCount = resultArray[key].ticketCount;

      const a = ticketCount > 0 ? (count / ticketCount).toFixed(2) : 0;

      return {
        time: resultArray[key].time,
        count: isNaN(a) ? 0 : parseFloat(a),
      };
    });

    // console.log("AverageServHours", resultObject)

    return resultObject;
  } catch (err) {
    console.log(err);
  }
};

module.exports = averageServHours;
