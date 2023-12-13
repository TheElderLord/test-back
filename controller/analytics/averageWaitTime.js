const getAverageWaitTime = async (facts) => {
    const resultArray = {};
    let totalWaitT = 0;

    facts.forEach((fact) => {
        const servicename = fact.servicename;
        let wait = 0;
        let ticketCount =0;

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
            const start = row.starttime * 1;
            
            if (state === "NEW") {
                const end = new Date();
                const diff = end - start;
                const diffInMinutes = diff / 60000;

                wait += diffInMinutes;
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
            } else if (state === "INSERVICE" || state === "COMPLETED") {
                const end = row.startservtime * 1;
                const diff = end - start;
                const diffInMinutes = diff / 60000;

                wait += diffInMinutes;
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
            wait /= ticketCount;
        }
        totalWaitT += wait;
    });

    totalWaitT /= facts.length;
    

    const resultObject = {
        total: totalWaitT.toFixed(2),
        data: Object.keys(resultArray).map((servicename) => ({
            servicename: servicename,
            times: resultArray[servicename],
        })),
    };

    // console.log(resultObject);
    return resultObject;
};

module.exports = getAverageWaitTime;
