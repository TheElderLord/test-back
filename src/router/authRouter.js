const express = require('express');
const router = express.Router();

const authController = require('../controller/auth/AuthController');

router.route('/login').post(authController.login);
router.route('/nomadLogin').post(authController.nomadLogin);
router.route('/logout').post(authController.logout);
router.route('/').get(authController.auth);



module.exports = router;