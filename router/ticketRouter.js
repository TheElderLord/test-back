const express = require('express');
const ticketController = require('../controller/ticketController');


const router = express.Router();

router.route('/').get((req, res) => {
    ticketController.getTickets(req, res);
});

module.exports = router;
