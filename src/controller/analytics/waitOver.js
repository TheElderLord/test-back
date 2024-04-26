const waitOver = async (facts) => {
  console.log(facts);
  const resultArray = {};
  let totalWaitOver = 0;
  try {
    facts.map((fact) => {
      const servicename = fact.servicename;
      if (!resultArray[servicename]) {
        resultArray[servicename] = 0;
      }
      fact.rows.map((row) => {
        const waitover = row.waitover;
        // const servover = row.servover;
        // const rating = row.rating;
        if (waitover == "true") {
          resultArray[servicename]++;
        }
      });
      totalWaitOver += resultArray[servicename];
    });
    const waitOverObject = {
      total: totalWaitOver,
      data: Object.keys(resultArray).map((servicename) => ({
        servicename: servicename,
        count: resultArray[servicename],
      })),
    };

    return waitOverObject;
  } catch (err) {
    console.log(err);
  }
};

module.exports = waitOver;
