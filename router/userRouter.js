const express = require('express');
const userController = require('../controller/userController');


const router = express.Router();

router.route('/').get((req, res) => {
    userController.getUsers(req, res);
});

module.exports = router;
