const express = require('express');
const BranchListController = require('../controller/brenchType/branchListController');


const router = express.Router();

router.route('/').get(BranchListController.getBranchList);
router.route('/:id').post(BranchListController.setMenu);
router.route('/block/:id').post(BranchListController.setBlock);
router.route('/list/br').get(BranchListController.getList);
router.route('/br/type/:id').get(BranchListController.brtype);
router.route('/br/type/').get(BranchListController.brtype);

module.exports = router;