const averageServHours = async (tickets) => {
  const result = {};
  let ticketCount = 0;
  tickets.forEach((ticket) => {
    try {
      const start = ticket.startservtime * 1;

      const date = new Date(start);
      const hour = date.getHours();

      if (!result[hour]) {
        result[hour] = {
          time: hour,
          count: 0,
        };
      }
      if (ticket.state === "NEW") {
        const end = new Date() * 1;
        const diff = end - start;
        const diffInMinutes = diff / 60000;
        result[hour].count += diffInMinutes;
        ticketCount++;
      } else if (ticket.state === "COMPLETED") {
        const end = ticket.stopservtime;
        const diff = end - start;
        const diffInMinutes = diff / 60000;
        result[hour].count += diffInMinutes;
        ticketCount++;
      }
    //   result[hour].count /= ticketCount;

    } catch (err) {
      console.log(err);
    }
  });

  const resultArray = Object.values(result);

  // console.log(resultArray);

  return resultArray;
};

module.exports = averageServHours;

// const averageServHours = async (tickets) => {
//     const result = {};

//     tickets.forEach((ticket) => {
//         const date = new Date(ticket.starttime);
//         const hour = date.getHours();
//         const minute = date.getMinutes();
//         const starttime = ticket.startservtime*1;

//         const key = `${hour}:${minute < 10 ? '0' + minute : minute}`;
//         if (!result[key]) {
//             result[key] = [];
//         }

//         const state = ticket.state;
//         if(state == "INSERVICE"){
//             const endtime = new Date();
//             const diff = (endtime - starttime)/60000;
//             result[key].push(diff);
//         }
//         else if(state == "COMPLETED"){
//             const endtime = ticket.stopservtime*1;
//             const diff = (endtime - starttime)/60000;
//             result[key].push(diff);
//         }
//         // if(ticket.rows.length > 0){
//         //     result[key] /= ticket.rows.length;
//         // }
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
//         const avg = sortedResult[key].reduce((a, b) => a + b, 0) / sortedResult[key].length;
//         return {
//             hour: hour,
//             minute: parseInt(minute) < 10 ? '0' + parseInt(minute) : parseInt(minute) + '',
//             value: Math.round(avg) ,
//             // tickets: sortedResult[key],
//         };
//     });

//     return resultJson;
// };
// module.exports = averageServHours;
