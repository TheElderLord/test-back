
const express = require('express');
const {analytics} = require('../controller/analytics/analyticsController');

const router = express.Router();

router.get('/', analytics);
router.get('/:id', analytics);

module.exports = router;