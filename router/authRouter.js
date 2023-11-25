const express = require('express');
const router = express.Router();

const authController = require('../controller/auth/AuthController');

router.route('/login').post((req, res) => {
    authController.login(req, res);
});



module.exports = router;