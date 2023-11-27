const express = require('express');
const userController = require('../controller/users/userController');


const router = express.Router();

router.route('/').get((req, res) => {
    userController.getUsers(req, res);
});
router.route('/last').get((req, res) => {
    userController.getLastUsers(req, res);
});
router.route('/messages').get((req,res)=>{
    userController.getMessages(req,res);
})

module.exports = router;
