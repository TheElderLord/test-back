const peakHours = async (tickets) => {
    const result = {};

    tickets.forEach((ticket) => {
        const date = new Date(ticket.starttime);
        const hour = date.getHours();
        const minute = date.getMinutes();

        const key = `${hour}:${minute < 10 ? '0' + minute : minute}`;
        if (!result[key]) {
            result[key] = [];
        }
        if (!result[key]["WAITOVER"])
            result[key]["WAITOVER"] = 0;
        if (!result[key]["SERVOVER"])
            result[key]["SERVOVER"] = 0;
        if (!result[key]["BAD"])
            result[key]["BAD"] = 0;

        if (ticket.waitover == "true") {
            result[key]["WAITOVER"]++;
        }
        if (ticket.servover == "true") {
            result[key]["SERVOVER"]++;
        }
        if (ticket.rating == 1 || ticket.rating == 2) {
            result[key]["BAD"]++;
        }

        result[key].push(ticket);
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
        const WaitOver = sortedResult[key]["WAITOVER"];
        const ServOver = sortedResult[key]["SERVOVER"];
        const Bad = sortedResult[key]["BAD"];
        return {
            hour: hour,
            minute: parseInt(minute) < 10 ? '0' + parseInt(minute) : parseInt(minute) + '',
            count: sortedResult[key].length,
            WaitOver: WaitOver,
            ServOver: ServOver,
            Bad: Bad,
            // tickets: sortedResult[key],
        };
    });

    return resultJson;
};
module.exports = peakHours;


// const peakHours = async (tickets) => {
//     const result = {};

//     tickets.forEach((ticket) => {
//         const date = new Date(ticket.starttime);
//         const hour = date.getHours();
//         const minute = date.getMinutes();

//         const key = `${hour}:${minute < 10 ? '0' + minute : minute}`;
//         if (!result[key]) {
//             result[key] = [];
//         }
//         if (!result[key]["WAITOVER"])
//             result[key]["WAITOVER"] = 0;
//         if (!result[key]["SERVOVER"])
//             result[key]["SERVOVER"] = 0;
//         if (!result[key]["BAD"])
//             result[key]["BAD"] = 0;

//         if (ticket.waitover == "true") {
//             result[key]["WAITOVER"]++;
//         }
//         if (ticket.servover == "true") {
//             result[key]["SERVOVER"]++;
//         }
//         if (ticket.rating == 1 || ticket.rating == 2) {
//             result[key]["BAD"]++;
//         }

//         result[key].push(ticket);
//     });
    

//     const sortedResult = Object.keys(result).sort((a, b) => {
//         const [hourA, minuteA] = a.split(':').map(Number);
//         const [hourB, minuteB] = b.split(':').map(Number);

//         if (hourA !== hourB) {
//             return hourA - hourB;
//         } else {
//             return minuteA - minuteB;
//         }
//     }).reduce((acc, key) => {
//         acc[key] = result[key];
//         return acc;
//     }, {});
//     // console.log(sortedResult);

//     const resultJson = Object.keys(sortedResult).map((key) => {
//         const [hour, minute] = key.split(':');
//         const WaitOver = sortedResult[key]["WAITOVER"];
//         const ServOver = sortedResult[key]["SERVOVER"];
//         const Bad = sortedResult[key]["BAD"];
//         return {
//             hour: hour,
//             minute: parseInt(minute) < 10 ? '0' + parseInt(minute) : parseInt(minute) + '',
//             count: sortedResult[key].length,
//             WaitOver: WaitOver,
//             ServOver: ServOver,
//             Bad: Bad,
//             // tickets: sortedResult[key],
//         };
//     });

//     return resultJson;
// };
// module.exports = peakHours;