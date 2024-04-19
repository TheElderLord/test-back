const express = require('express');
const ticketController = require('../controller/ticket/ticketController');

// const WebSocket = require('ws');

// const wss = new WebSocket.Server({ port: 8080 });



// wss.on('connection',(socket,req)=>{
//     console.log('connected');
//     setInterval(async()=>{
//         const tickets = await wssSend(req.id);

//         socket.send(JSON.stringify(tickets));
//     },3000);
// })

const router = express.Router();

router.route('/').get((req, res) => {
   ticketController.getTickets(req, res);
});
router.get('/branch-tickets',ticketController.branchTickets);
router.get('/branch-tickets/:id',ticketController.branchTickets);

router.get("/service-tickets",ticketController.getServiceTickets);


// router.route('/:id').get((req, res) => {
//     getTicketsByBranchId(req, res);
// });
router.get('/list', ticketController.getTicketList);
router.get('/list/:id', ticketController.getTicketList);

router.get('/map', ticketController.getMapInfo);
router.get('/map/:id', ticketController.getMapInfo);
router.get('/download',ticketController.downloadTickets)

module.exports = { router };
