const express = require('express');
const branchController = require('../controller/branch/branchController');


const router = express.Router();

router.route('/').get((req, res) => {
    branchController.getBranches(req, res);
});
router.route('/:id').get((req, res) => {
    branchController.getBrachById(req, res);
});

module.exports = router;
