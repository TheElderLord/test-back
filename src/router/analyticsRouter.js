
const express = require('express');
const {analytics} = require('../controller/analytics/analyticsController');

const router = express.Router();

router.get('/', analytics);

module.exports = router;