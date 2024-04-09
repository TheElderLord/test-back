
const express = require('express');
const boardController = require('../controller/board/boardController');

const router = express.Router();

router.route('/').get(boardController.getList)
.post(boardController.createBoard);


module.exports = router;