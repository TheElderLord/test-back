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



router.route('/list/:id').get(userController.getUserById).
delete(userController.deleteUser)
.put(userController.updateUser);

router.route('/get-info').get(userController.getUs).
put(userController.updateUserInfo)




const storage = multer.diskStorage({
  destination: './images', // Specify the destination folder for storing images
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });


router.post("/upload", upload.single("image"), async (req, res) => {
  try {
  const imagePath = req.file.originalname;
  const login = req.query.login;
  // Insert the image path into the MySQL table
  const insertQuery = `Update users set image = '${imagePath}' where login = '${login}'`;
  console.log(insertQuery);
  
    const result = await connection(insertQuery);
    console.log(result);
    res.status(201).json({
      message: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

module.exports = router;
