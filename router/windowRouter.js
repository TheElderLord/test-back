const express = require('express');
const windowController = require('../controller/windowController');


const router = express.Router();

router.route('/:id').get((req, res) => {
    windowController.getWindows(req, res);
});

module.exports = router;
