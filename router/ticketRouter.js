const express = require('express');
const {getTickets,getTicketsByBranchId,wssSend,getTicketList} = require('../controller/ticket/ticketController');

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });



wss.on('connection',(socket,req)=>{
    console.log('connected');
    setInterval(async()=>{
        const tickets = await wssSend(req.id);

        socket.send(JSON.stringify(tickets));
    },3000);
})

const router = express.Router();

router.route('/').get((req, res) => {
   getTickets(req, res);
});
// router.route('/:id').get((req, res) => {
//     getTicketsByBranchId(req, res);
// });
router.get('/list/t', (req, res) => {
    getTicketList(req, res);
});

module.exports = { router , wss};
