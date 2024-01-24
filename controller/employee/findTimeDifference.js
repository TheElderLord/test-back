const findTimeDifference = async (rows) => {
  rows.map((row) => {
    try {
      const startTime = row.startTime;
      const timestamp = startTime * 1; // Replace this with your timestamp in milliseconds
      // console.log(timestamp);
      if (timestamp === 0) {
        row.timeDifference = 0;
        return;
      }
      const date = new Date(timestamp);
      // console.log(date)
      const now = new Date();

      if (isNaN(date.getTime())) {
        console.error("Invalid date");
      } else {
        const timeDifference = now - date;
        const hoursDifference = timeDifference / (1000 * 60 * 60);
        const formattedDate = Math.round(hoursDifference * 100) / 100;
        row.timeDifference = formattedDate; // Convert milliseconds to hours
        // console.log(`Difference in hours: ${hoursDifference}`);
      }

      // row.timeDifference = timeDifferenceInHours;
    } catch (err) {
      console.log(err);
    }
  });
  return rows;
};
module.exports = findTimeDifference;
