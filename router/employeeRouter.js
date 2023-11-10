const express = require('express');
const employeeController = require('../controller/employeeController');


const router = express.Router();

router.route('/').get((req, res) => {
    employeeController.getEmployees(req, res);
});

module.exports = router;
