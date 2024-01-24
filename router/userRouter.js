const express = require('express');
const userController = require('../controller/users/userController');
const multer = require('multer');
const path = require('path');

const connection = require('../db/connection')


const router = express.Router();

router.route('/').get((req, res) => {
    userController.getUsers(req, res);
});
router.route('/last').get((req, res) => {
    userController.getLastUsers(req, res);
});
router.route('/messages').get(userController.getMessages).
post(userController.postMessage).
patch(userController.makeSeen);



router.route('/list/:id').delete(userController.deleteUser)
.put(userController.updateUser);

router.get('/get-info',userController.getUs);




const storage = multer.diskStorage({
  destination: './images', // Specify the destination folder for storing images
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });


router.post('/upload', upload.single('image'),async (req, res) => {
  const imagePath = req.file.originalname;
  const id = req.query.id;
  // Insert the image path into the MySQL table
  const insertQuery = `Update users set image = '${imagePath}' where id = ${id}`;
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
