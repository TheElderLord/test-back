const express = require('express');
const ticketController = require('../controller/ticket/ticketController');


const router = express.Router();

router.route('/').get((req, res) => {
    ticketController.getTickets(req, res);
});
router.route('/:id').get((req, res) => {
    ticketController.getTicketsByBranchId(req, res);
});

module.exports = router;
