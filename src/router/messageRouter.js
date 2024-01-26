const express = require('express');
const messageController = require('../controller/messages/messageController');


const router = express.Router();
router.route('/').get(messageController.getMessages).
post(messageController.post).
patch(messageController.makeSeen);

module.exports = router;