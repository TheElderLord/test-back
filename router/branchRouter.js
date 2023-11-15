const express = require('express');
const branchController = require('../controller/branch/branchController');


const router = express.Router();

router.route('/').get((req, res) => {
    branchController.getBranch(req, res);
});

module.exports = router;
