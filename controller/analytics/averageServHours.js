const averageServHours = async (tickets) => {
    const result = {};

    tickets.forEach((ticket) => {
        const date = new Date(ticket.starttime);
        const hour = date.getHours();
        const minute = date.getMinutes();
        const starttime = ticket.startservtime*1;
        
        const key = `${hour}:${minute < 10 ? '0' + minute : minute}`;
        if (!result[key]) {
            result[key] = [];
        }

        const state = ticket.state;
        if(state == "INSERVICE"){
            const endtime = new Date();
            const diff = (endtime - starttime)/60000;
            result[key].push(diff);
        }
        else if(state == "COMPLETED"){
            const endtime = ticket.stopservtime*1;
            const diff = (endtime - starttime)/60000;
            result[key].push(diff);
        }
        // if(ticket.rows.length > 0){
        //     result[key] /= ticket.rows.length;
        // }
    });
    

    const sortedResult = Object.keys(result).sort((a, b) => {
        const [hourA, minuteA] = a.split(':').map(Number);
        const [hourB, minuteB] = b.split(':').map(Number);

        if (hourA !== hourB) {
            return hourA - hourB;
        } else {
            return minuteA - minuteB;
        }
    }).reduce((acc, key) => {
        acc[key] = result[key];
        return acc;
    }, {});
    // console.log(sortedResult);

    const resultJson = Object.keys(sortedResult).map((key) => {
        const [hour, minute] = key.split(':');
        const avg = sortedResult[key].reduce((a, b) => a + b, 0) / sortedResult[key].length;
        return {
            hour: hour,
            minute: parseInt(minute) < 10 ? '0' + parseInt(minute) : parseInt(minute) + '',
            value: Math.round(avg) ,
            // tickets: sortedResult[key],
        };
    });

    return resultJson;
};
module.exports = averageServHours;