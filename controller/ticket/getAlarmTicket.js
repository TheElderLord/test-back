
const getAlarmTickets = async (rows) => {
     try {
        
        const alarm = {};

        await Promise.all(
           
        rows.map(async (row) => {
            const servover = row.servover;
            const waitover = row.waitover;
            const rate = row.rating;
             try {
                 //Alarms beginning:
                if (!alarm["servover"]) {
                    alarm["servover"] = [];
                }
                if (!alarm["waitover"]) {
                    alarm["waitover"] = [];
                }
                if (!alarm["rate"]) {
                    alarm["rate"] = [];
                }

                if (servover === "true") {

                    alarm["servover"].push(row);
                }
                if (waitover === "true") {

                    alarm["waitover"].push(row);
                }
                if (rate * 1 == 2 || rate * 1 == 1) {

                    alarm["rate"].push(row);
                }
               
            
            } catch (err) {
                console.log(err);
            }
        })
        );

         const alarmJson = {
            totalLength: Object.values(alarm).reduce((acc, alarm) => acc + alarm.length, 0),
            data: Object.keys(alarm).map((alarmName) => ({
                alarmName: alarmName,
                count: alarm[alarmName].length,
                // rows: alarm[alarmName],
            })),

        }
        return alarmJson;
    } catch (err) {
        console.error(err);
       
    }
};

module.exports = getAlarmTickets;

