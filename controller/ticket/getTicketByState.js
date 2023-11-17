


const getAlarmTicket = require('./getAlarmTicket');



const getTicketStateTickets = async (rows) => {
    
    try {
        const states = {};
      
        
        
        
        await Promise.all(
           
        rows.map(async (row) => {
         
            const state = row.state;

            try {
               

                //Tickets by state beginning:
                if (!states[state]) {
                    states[state] = [];
                }

               
                states[state].push(row);
            } catch (err) {
                console.log(err);
            }
        })
        );

        const stateJson = {
            totalLength: Object.values(states).reduce((acc, state) => acc + state.length, 0),
            data: Object.keys(states).map((stateName) => ({
                stateName: stateName,
                count: states[stateName].length,

                // rows: states[stateName],
            })),
        };


        return stateJson;
    } catch (err) {
        console.error(err);
       
    }
};
module.exports = getTicketStateTickets;



