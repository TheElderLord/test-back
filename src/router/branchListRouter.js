const express = require('express');
const BranchListController = require('../controller/brenchType/branchListController');


const router = express.Router();

router.route('/').get(BranchListController.getBranchList);

module.exports = router;