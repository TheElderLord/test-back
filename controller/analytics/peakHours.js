const peakHours = async (tickets) => {
    const result = {};

    tickets.forEach((ticket) => {
        const start = ticket.starttime * 1;
        const date = new Date(start);
        const hour = date.getHours();
        const minutes = date.getMinutes();

        const key = `${hour}:${minutes <= 30 ? '00' : '30'}`;
        if (!result[key]) {
            result[key] = {
                time: key,
                count: 0,
                WAITOVER: 0,
                SERVOVER: 0,
                BAD: 0,
            };
        }

        result[key].count += 1;
        if (ticket.waitover === "true") {
            result[key].WAITOVER += 1;
        }
        if (ticket.servover === "true") {
            result[key].SERVOVER += 1;
        }
        if (ticket.rating === 1 || ticket.rating === 2) {
            result[key].BAD += 1;
        }
    });

    const resultArray = Object.values(result).sort((a, b) => {
        const timeA = a.time.split(':').map(Number);
        const timeB = b.time.split(':').map(Number);

        if (timeA[0] !== timeB[0]) {
            return timeA[0] - timeB[0];
        } else {
            return timeA[1] - timeB[1];
        }
    });

    // console.log(resultArray);

    return resultArray;
};

module.exports = peakHours;




// const peakHours = async (tickets) => {
//     const result = {};

//     tickets.forEach((ticket) => {
//         const start = ticket.starttime * 1
//         const date = new Date(start);
//         const hour = date.getHours();
//         const minutes = date.getMinutes();


//         // if (!result[hour]) {
//         //     result[hour] = {
//         //         time: hour,
//         //         count: 0,
//         //         WAITOVER: 0,
//         //         SERVOVER: 0,
//         //         BAD: 0,
//         //     };
//         // }


//         if (minutes <= 30) {
//             if (!result[hour]["30"]) {
//                 result[hour]["30"] = {
//                     time: hour,
//                     count: 0,
//                     WAITOVER: 0,
//                     SERVOVER: 0,
//                     BAD: 0,
//                 };
//             }
//         }
//         else if (minutes > 30 && minutes <= 59) {
//             if (!result[hour + 1]) {
//                 result[hour + 1] = {
//                     time: hour,
//                     count: 0,
//                     WAITOVER: 0,
//                     SERVOVER: 0,
//                     BAD: 0,
//                 };
//             }
//         }


//         if (minutes <= 30) {
//             result[hour]["30"].count += 1;
//             if (ticket.waitover === "true") {
//                 result[hour]["30"].WAITOVER += 1;
//             }
//             if (ticket.servover === "true") {
//                 result[hour]["30"].SERVOVER += 1;
//             }
//             if (ticket.rating === 1 || ticket.rating === 2) {
//                 result[hour]["30"].BAD += 1;
//             }

//         }
//         else if (minutes > 30 && minutes <= 59) {
//             result[hour + 1].count += 1;
//             if (ticket.waitover === "true") {
//                 result[hour + 1].WAITOVER += 1;
//             }
//             if (ticket.servover === "true") {
//                 result[hour + 1].SERVOVER += 1;
//             }
//             if (ticket.rating === 1 || ticket.rating === 2) {
//                 result[hour + 1].BAD += 1;
//             }
//         }

//         // result[hour].count += 1;
//         // if (ticket.waitover === "true") {
//         //     result[hour].WAITOVER += 1;
//         // }
//         // if (ticket.servover === "true") {
//         //     result[hour].SERVOVER += 1;
//         // }
//         // if (ticket.rating === 1 || ticket.rating === 2) {
//         //     result[hour].BAD += 1;
//         // }
//     });
//     console.log(result)

//     const resultArray = Object.values(result);

//     // console.log(resultArray);

//     return resultArray;
// };

// module.exports = peakHours;

