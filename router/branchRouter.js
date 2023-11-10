const express = require('express');
const branchController = require('../controller/branchController');


const router = express.Router();

router.route('/').get((req, res) => {
    branchController.getBranches(req, res);
});

module.exports = router;
