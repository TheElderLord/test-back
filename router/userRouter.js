const express = require('express');
const userController = require('../controller/users/userController');


const router = express.Router();

router.route('/').get((req, res) => {
    userController.getUsers(req, res);
});
router.route('/last').get((req, res) => {
    userController.getLastUsers(req, res);
});
router.route('/messages').get(userController.getMessages).
post(userController.postMessage);

router.route('/list/:id').delete(userController.deleteUser)
.put(userController.updateUser);

module.exports = router;
