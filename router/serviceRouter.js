const express = require('express');
const serviceController = require('../controller/serviceController');


const router = express.Router();

router.route('/').get((req, res) => {
    serviceController.getServices(req, res);
});

module.exports = router;
