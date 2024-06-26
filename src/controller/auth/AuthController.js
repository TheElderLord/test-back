const query = require("../../db/connection");
const { secret } = require("../../constants/constant");

const nomadDb = require("../../db/nomadConnection");

const moment = require("moment");

const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();
const secretKey = secret; // Replace with your actual secret key

app.use(bodyParser.json());

exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists
  try {
    const user = await query(
      "SELECT * FROM users WHERE login = ? AND password = ?",
      [username, password]
    );

    if (user && user.length > 0) {
      const sql = `UPDATE users SET sign_in_date = '${moment().format(
        "YYYY-DD-MM HH:mm:ss"
      )}' WHERE id = ${user[0].id}`;
      await query(sql);

      // Generate a JWT token
      const token = jwt.sign(
        { userId: user[0].id, username: user[0].login,role:user[0].role },
        secretKey,
        { expiresIn: "24h" }
      );

      res.json({
        message: "Authentication successful!",
        token,
        login: user[0].login,
        role:user[0].role
        // user: {
        //     id: user[0].id,
        //     username: user[0].login,
        //     image: user[0].image
        // },
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.nomadLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await nomadDb(
      "SELECT * FROM t_g_user WHERE F_LOGIN = ? AND F_PASSWORD = ?",
      [username, password]
    );

    if (user && user.length > 0) {
      // console.log(user)
      const inSc = await query(
        "SELECT * FROM users WHERE login = ? AND password = ?",
        [username, password]
      );
      // console.log(inSc)
      if(inSc.length === 0){
        const sql = `Insert into users(login,password,role,id_branch) 
        values(${user[0].F_LOGIN},${user[0].F_PASSWORD},3,${user[0].F_LOGIN.substring(0,4)})`;
        await query(sql);
       
      }
     
      const token = jwt.sign(
        {
          userId: user[0].F_ID,
          username: user[0].F_LOGIN,
          branch: username.substring(0, 4),
        },
        secretKey,
        { expiresIn: "24h" }
      );

      res.json({
        message: "Authentication successful!",
        token,
        // login:user[0].login,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.logout = async (req, res) => {
  const token = req.headers.bearer;
  //Destroy the token

  try {
    jwt.destroy(token);
    console.log("destroyed");

    res.json({ message: "Logout successful!" });
  } catch (err) {
    console.log(err);
  }
};

exports.auth = async (req, res) => {
  const token = req.headers.bearer;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token is missing" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // Token is valid, you can access decoded data in your routes
    // const username = decoded.username;

    return res.status(200).json({
      message:"Valid"
    });
  });
};
