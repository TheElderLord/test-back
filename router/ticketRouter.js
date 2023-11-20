const express = require('express');
const {getTickets,getTicketsByBranchId,wssSend} = require('../controller/ticket/ticketController');

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });


let i =0;
wss.on('connection',(socket,req)=>{
    setInterval(async()=>{
        const tickets = await wssSend();

        socket.send(JSON.stringify(tickets));
    },3000);
})

const router = express.Router();

router.route('/').get((req, res) => {
   getTickets(req, res);
});
router.route('/:id').get((req, res) => {
    getTicketsByBranchId(req, res);
});

module.exports = { router , wss};
