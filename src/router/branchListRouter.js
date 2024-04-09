const express = require('express');
const BranchListController = require('../controller/brenchType/branchListController');


const router = express.Router();

router.route('/').get(BranchListController.getBranchList);
router.route('/:id').post(BranchListController.setMenu);
router.route('/block/:id').post(BranchListController.setBlock);
router.route('/list/br').get((req,res)=>{
    BranchListController.getList(req,res);
});
router.route('/br/type').get(BranchListController.brtype);

module.exports = router;