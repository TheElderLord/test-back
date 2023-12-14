const express = require('express');
const userController = require('../controller/users/userController');
const multer = require('multer');
const path = require('path');


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




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../images'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage
});

router.post('/upload', upload.single('image'),async (req, res) => {
  const imagePath = req.files.originalname;
  
  // Insert the image path into the MySQL table
  const insertQuery = `Update users set image = ${imagePath} where login = kgd`;
  connection.query(insertQuery, (error) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(201).send('Image uploaded successfully.');
    }
  });
   
});

module.exports = router;
