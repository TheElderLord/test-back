const express = require('express');

const roleController = require('../controller/roleController');

const router = express.Router();

router.get('/', roleController.getRoles);

module.exports = router;