const express = require('express');
const router = express.Router();

const authController = require('../controller/auth/AuthController');

router.route('/login').post(authController.login);
router.route('/logout').post(authController.logout);



module.exports = router;