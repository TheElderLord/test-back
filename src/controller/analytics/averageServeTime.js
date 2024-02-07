const getAverageServeTime = async (facts) => {
  const resultArray = {};
  let totalServe = 0;
  // console.log("Average serve time",facts)
  facts.forEach((fact) => {
    // console.log(fact)
    try {
      const servicename = fact.servicename;
      let serve = 0;
      let ticketCount = 0;

      if (!resultArray[servicename]) {
        resultArray[servicename] = {
          "0-5": 0,
          "5-10": 0,
          "10-20": 0,
          "20-30": 0,
          "30>": 0,
        };
      }

      fact.rows.forEach((row) => {
        const state = row.state;
        const start = row.startservtime * 1;

        if (state === "INSERVICE") {
          const end = new Date();
          const diff = end - start;
          // const diffInMinutes = diff / 60000;
          const diffInMinutes = diff / 1000;

          serve += diffInMinutes;
          ticketCount++;

          if (diffInMinutes >= 0 && diffInMinutes <= 5) {
            resultArray[servicename]["0-5"] += 1;
          } else if (diffInMinutes >= 5 && diffInMinutes <= 10) {
            resultArray[servicename]["5-10"] += 1;
          } else if (diffInMinutes >= 10 && diffInMinutes <= 20) {
            resultArray[servicename]["10-20"] += 1;
          } else if (diffInMinutes >= 20 && diffInMinutes <= 30) {
            resultArray[servicename]["20-30"] += 1;
          } else if (diffInMinutes >= 30) {
            resultArray[servicename]["30>"] += 1;
          }
        } else if (state === "COMPLETED") {
          const end = row.stopservtime * 1;
          const diff = end - start;
          // const diffInMinutes = diff / 60000;
          const diffInMinutes = diff / 1000;

          serve += diffInMinutes;
          ticketCount++;

          if (diffInMinutes >= 0 && diffInMinutes <= 5) {
            resultArray[servicename]["0-5"] += 1;
          } else if (diffInMinutes > 5 && diffInMinutes <= 10) {
            resultArray[servicename]["5-10"] += 1;
          } else if (diffInMinutes > 10 && diffInMinutes <= 20) {
            resultArray[servicename]["10-20"] += 1;
          } else if (diffInMinutes > 20 && diffInMinutes <= 30) {
            resultArray[servicename]["20-30"] += 1;
          } else if (diffInMinutes > 30) {
            resultArray[servicename]["30>"] += 1;
          }
        }
      });

      if (ticketCount > 0) {
        serve /= ticketCount;
      }
      totalServe += serve;
    } catch (err) {
      console.log(err);
    }
  });

  totalServe /= facts.length;

  const resultObject = {
    total: totalServe.toFixed(2),
    data: Object.keys(resultArray).map((servicename) => ({
      servicename: servicename,
      times: resultArray[servicename],
    })),
  };

  // console.log(resultObject);
  return resultObject;
};

module.exports = getAverageServeTime;
