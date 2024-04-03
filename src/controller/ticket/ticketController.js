const alltickets = require("./getTickets");
const getAlarmTickets = require("./getAlarmTicket");
const getRatingTicket = require("./getRatingTicket");
const getStatesTickets = require("./getTicketByState");
const getServiceTicket = require("./getServiceTicket");
const getBranchTickets = require("./getTicketByBranch");
const getMapInfo = require("./getMapInfo");
const getList = require('./getTicketList')

// const wssSend = async () => {
//   const login = req.user;
//   const tickets = await alltickets(login);
//   const alarm = await getAlarmTickets(tickets);
//   const rating = await getRatingTicket(tickets);
//   const states = await getStatesTickets(tickets);
//   const service = await getServiceTicket(tickets);
//   const branch = await getBranchTickets(tickets);
//   // console.log(branch);
//   const data = {
//     message: "Success",
//     count: tickets.length,
//     data: {
//       alarm: alarm,
//       serviceTickets: service,
//       states: states,
//       rating: rating,
//       branchTickets: branch,
//     },
//   };
//   return data;
// };

exports.getTickets = async (req, res) => {
  const username = req.user;

  // console.log("Ticket controller", req.headers.bearer, req.headers.login)
  const tickets = await alltickets(username);
  const alarm = await getAlarmTickets(tickets);
  const rating = await getRatingTicket(username);
  const states = await getStatesTickets(tickets);
  const service = await getServiceTicket(tickets);
  const branch = await getBranchTickets(username);
  // console.log(branch);
  const data = {
    message: "Success",
    count: tickets.length,
    data: {
      alarm: alarm,
      serviceTickets: service,
      states: states,
      rating: rating,
      branchTickets: branch,
    },
  };
  res.status(200).json(data);
};
exports.branchTickets = async (req, res) => {
  const username = req.user;
  const branch_id = req.params.id;
  // console.log("Ticket controller", req.headers.bearer, req.headers.login)
  const tickets = await alltickets(username,branch_id);
  const branch = await getBranchTickets(username,branch_id);
  // console.log(branch);
  const data = {
    message: "Success",
    count: tickets.length,
    data: branch,
  };
  res.status(200).json(data);
};
exports.getServiceTickets = async (req, res) => {
  const username = req.user;

  // console.log("Ticket controller", req.headers.bearer, req.headers.login)
  const tickets = await alltickets(username);
  
  const service = await getServiceTicket(tickets);
  
  const data = {
    message: "Success",
    count: tickets.length,
    data:service,
  };
  res.status(200).json(data);
};
// const getTicketsByBranchId = async (req, res) => {
//     const id = req.params.id;
//     const tickets = await alltickets(id);
//     const alarm = await getAlarmTickets(tickets);
//     const rating = await getRatingTicket(tickets);
//     const states = await getStatesTickets(tickets);
//     const service = await getServiceTicket(tickets);
//     const data = {
//         message: 'Success',
//         count: tickets.length,
//         data: {
//             alarm: alarm,
//             serviceTickets: service,
//             states: states,
//             rating: rating,
//         },
//     };
//     res.status(200).json(data);

// }
exports.getTicketList = async (req, res) => {
  const username = req.user;
  const branch_id = req.params.id;
  const page = parseInt(req.query.page) || 1; // Current page number
  const limit = parseInt(req.query.limit) || 25; // Number of items per page

  const {tickets,pagesCount} = await getList(username,page,limit,branch_id);
  const data = {
    message: "Success",
    count: tickets.length,
    pages: pagesCount,
    data: {
      tickets: tickets,
    },
  };
  res.status(200).json(data);
};
exports.getBranchList = async (req, res) => {
  const username = req.user;
  const branch_id = req.params.id;
  const tickets = await alltickets(username,branch_id);
  const data = {
    message: "Success",
    count: tickets.length,
    data: {
      tickets: tickets,
    },
  };
  res.status(200).json(data);
};


exports.getMapInfo = async(req,res)=>{
  const username = req.user;
  const branch_id = req.params.id;
  const info = await getMapInfo(username,branch_id);
  const data = {
    message: "Success",
    
    data: info,
  };
  res.status(200).json(data);
}
// module.exports = { getTickets,  getTicketList };

// exports.getTickets = async (req, res) => {

//     try {
//         const rows = await query('SELECT * FROM facts');

//         const alarm = {};
//         const serviceTickets = {};
//         const branchTicketsArray = [];
//         const states = {};
//         const rating = {};

//         await Promise.all(

//         rows.map(async (row) => {
//             const servover = row.servover;
//             const waitover = row.waitover;
//             const rate = row.rating;

//             const serviceName = row.servicename;
//             const branchId = row.idbranch;
//             const state = row.state;

//             try {
//                 if (!rating["perfect"]) {
//                     rating["perfect"] = [];
//                 }
//                 if (!rating["good"]) {
//                     rating["good"] = [];
//                 }
//                 if (!rating["satisfactory"]) {
//                     rating["satisfactory"] = [];
//                 }
//                 if (!rating["bad"]) {
//                     rating["bad"] = [];
//                 }
//                 if (!rating["empty"]) {
//                     rating["empty"] = [];
//                 }
//                 const rateNum = rate * 1;
//                 switch (rateNum) {
//                     case 5: rating["perfect"].push(row); break;
//                     case 4: rating["good"].push(row); break;
//                     case 3: rating["satisfactory"].push(row); break;
//                     case 2: rating["bad"].push(row); break;
//                     case 1: rating["bad"].push(row); break;
//                     default: rating["empty"].push(row); break;
//                 }

//                 //Alarms beginning:
//                 if (!alarm["servover"]) {
//                     alarm["servover"] = [];
//                 }
//                 if (!alarm["waitover"]) {
//                     alarm["waitover"] = [];
//                 }
//                 if (!alarm["rate"]) {
//                     alarm["rate"] = [];
//                 }

//                 if (servover === "true") {

//                     alarm["servover"].push(row);
//                 }
//                 if (waitover === "true") {

//                     alarm["waitover"].push(row);
//                 }
//                 if (rate * 1 == 2 || rate * 1 == 1) {

//                     alarm["rate"].push(row);
//                 }
//                 //Alarms end

//                 //Tickets by state beginning:
//                 if (!states[state]) {
//                     states[state] = [];
//                 }

//                 if (!serviceTickets[serviceName]) {
//                     serviceTickets[serviceName] = [];
//                 }

//                 if (!branchTicketsArray[branchId]) {
//                     branchTicketsArray[branchId] = [];
//                 }
//                 //Tickets by state end

//                 branchTicketsArray[branchId].push(row);
//                 serviceTickets[serviceName].push(row);
//                 states[state].push(row);
//             } catch (err) {
//                 console.log(err);
//             }
//         })
//         );

//         const serviceJson = {
//             totalLength: Object.values(serviceTickets).reduce((acc, service) => acc + service.length, 0),
//             data: Object.keys(serviceTickets).map((serviceName) => ({
//                 servicename: serviceName,
//                 length: serviceTickets[serviceName].length,
//                 // rows: serviceTickets[serviceName],
//             })),
//         };

//         const branchArray = Object.keys(branchTicketsArray).map(async (branchId) => {
//             const branchNameResult = await query('SELECT F_NAME FROM branches WHERE F_ID = ?', [branchId]);
//             const branchName = branchNameResult[0].F_NAME;
//             const totalLength = branchTicketsArray.reduce((acc, branch) => acc + branch.length, 0);
//             // const branchTickets = branchTicketsArray[branchId].map((ticket) => {
//             //     const {  idbranch, servicename, servover, waitover, rating } = ticket;

//             // });

//             let servObject = {};
//             let stateObject = {};
//             let alarmObject = [];
//             branchTicketsArray[branchId].map((ticket) => {
//                 const serviceName = ticket.servicename;
//                 const stateName = ticket.state;
//                 const servover = ticket.servover;
//                 const waitover = ticket.waitover;
//                 const rate = ticket.rating;

//                 if (!servObject[serviceName]) {
//                     servObject[serviceName] = [];
//                 }

//                 if (!stateObject[stateName]) {
//                     stateObject[stateName] = [];
//                 }
//                 if (servover === "true" || waitover === "true" || rate * 1 == 2 || rate * 1 == 1) {
//                     alarmObject.push(ticket);
//                 }

//                 stateObject[stateName].push(ticket);
//                 servObject[serviceName].push(ticket);

//             });
//             servObject = Object.keys(servObject).map((serviceName) => ({
//                 servicename: serviceName,
//                 count: servObject[serviceName].length,
//             }));

//             stateObject = Object.keys(stateObject).map((stateName) => ({
//                 stateName: stateName,
//                 count: stateObject[stateName].length,
//             }));

//             return {
//                 // totalLength: totalLength,

//                 branchId: branchId,
//                 branchName: branchName.replace("RU=", ""),
//                 count: branchTicketsArray[branchId].length,
//                 servObject: servObject,
//                 stateObject: stateObject,
//                 alarmObject: alarmObject.length,

//                 // rows: branchTicketsArray[branchId],
//             };
//         });

//         const alarmJson = {
//             totalLength: Object.values(alarm).reduce((acc, alarm) => acc + alarm.length, 0),
//             data: Object.keys(alarm).map((alarmName) => ({
//                 alarmName: alarmName,
//                 count: alarm[alarmName].length,
//                 // rows: alarm[alarmName],
//             })),

//         }

//         const rateJson = {
//             totalLength: Object.values(rating).reduce((acc, rating) => acc + rating.length, 0),
//             data: Object.keys(rating).map((ratingName) => ({
//                 ratingName: ratingName,
//                 count: rating[ratingName].length,
//                 // rows: alarm[alarmName],
//             })),
//         }

//         const stateJson = {
//             totalLength: Object.values(states).reduce((acc, state) => acc + state.length, 0),
//             data: Object.keys(states).map((stateName) => ({
//                 stateName: stateName,
//                 count: states[stateName].length,
//                 // rows: states[stateName],
//             })),
//         };

//         const branchTickets = await Promise.all(branchArray);

//         const data = {
//             message: 'Success',
//             count: rows.length,
//             data: {
//                 alarm: alarmJson,
//                 serviceTickets: serviceJson,
//                 branchTickets: branchTickets,
//                 states: stateJson,
//                 rating: rateJson,
//                 // rows: rows,
//             },
//         };

//         res.status(200).json(data);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             message: err.message,
//         });
//     }
// };

// exports.getTicketsByBranchId = async (req, res) => {
//     const id = req.params.id;
//     if (id) {

//         try {
//             const rows = await query('SELECT * FROM facts WHERE idbranch = ?', [id]);
//             const alarm = {};
//             const serviceTickets = {};
//             const branchTicketsArray = [];
//             const states = {};

//             await Promise.all(
//                 rows.map(async (row) => {
//                     const servover = row.servover;
//                     const waitover = row.waitover;
//                     const rate = row.rating;

//                     const serviceName = row.servicename;
//                     const branchId = row.idbranch;
//                     const state = row.state;

//                     try {
//                         if (servover === "true") {
//                             if (!alarm["servover"]) {
//                                 alarm["servover"] = [];
//                             }
//                             alarm["servover"].push(row);
//                         }
//                         if (waitover === "true") {
//                             if (!alarm["waitover"]) {
//                                 alarm["waitover"] = [];
//                             }
//                             alarm["waitover"].push(row);
//                         }
//                         if (rate * 1 == 2 || rate * 1 == 1) {
//                             if (!alarm["rate"]) {
//                                 alarm["rate"] = [];
//                             }
//                             alarm["rate"].push(row);
//                         }

//                         if (!states[state]) {
//                             states[state] = [];
//                         }

//                         if (!serviceTickets[serviceName]) {
//                             serviceTickets[serviceName] = [];
//                         }

//                         if (!branchTicketsArray[branchId]) {
//                             branchTicketsArray[branchId] = [];
//                         }

//                         branchTicketsArray[branchId].push(row);
//                         serviceTickets[serviceName].push(row);
//                         states[state].push(row);
//                     } catch (err) {
//                         console.log(err);
//                     }
//                 })
//             );

//             const serviceJson = {
//                 totalLength: Object.values(serviceTickets).reduce((acc, service) => acc + service.length, 0),
//                 data: Object.keys(serviceTickets).map((serviceName) => ({
//                     servicename: serviceName,
//                     length: serviceTickets[serviceName].length,
//                     // rows: serviceTickets[serviceName],
//                 })),
//             };

//             const branchArray = Object.keys(branchTicketsArray).map(async (branchId) => {
//                 const branchNameResult = await query('SELECT F_NAME FROM branches WHERE F_ID = ?', [branchId]);
//                 const branchName = branchNameResult[0].F_NAME;
//                 const totalLength = branchTicketsArray.reduce((acc, branch) => acc + branch.length, 0);
//                 // const branchTickets = branchTicketsArray[branchId].map((ticket) => {
//                 //     const {  idbranch, servicename, servover, waitover, rating } = ticket;

//                 // });
//                 return {
//                     totalLength: totalLength,
//                     data: {
//                         branchId: branchId,
//                         branchName: branchName,
//                         length: branchTicketsArray[branchId].length,
//                     }
//                     // rows: branchTicketsArray[branchId],
//                 };
//             });

//             const alarmJson = {
//                 totalLength: Object.values(alarm).reduce((acc, alarm) => acc + alarm.length, 0),
//                 data: Object.keys(alarm).map((alarmName) => ({
//                     alarmName: alarmName,
//                     length: alarm[alarmName].length,
//                     // rows: alarm[alarmName],
//                 })),

//             }

//             const stateJson = {
//                 totalLength: Object.values(states).reduce((acc, state) => acc + state.length, 0),
//                 data: Object.keys(states).map((stateName) => ({
//                     stateName: stateName,
//                     length: states[stateName].length,
//                     // rows: states[stateName],
//                 })),
//             };

//             // const branchTickets = await Promise.all(branchArray);

//             const data = {
//                 message: 'Success',
//                 count: rows.length,
//                 data: {
//                     alarm: alarmJson,
//                     serviceTickets: serviceJson,
//                     // branchTickets: branchTickets,
//                     states: stateJson,
//                 },
//             };

//             res.status(200).json(data);
//         } catch (err) {
//             console.error(err);
//             res.status(500).json({
//                 message: err.message,
//             });
//         }
//     }
// };
