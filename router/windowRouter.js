const express = require('express');
const windowController = require('../controller//windows/windowController');


const router = express.Router();

// router.route('/').get((req, res) => {
//     windowController.getWindows(req, res);
// });
router.route('/:id').get((req, res) => {
    windowController.getWindowsById(req, res);
});

module.exports = router;
