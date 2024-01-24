const query = require("../../db/connection");
const { secret } = require("../../constants/constant");

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
        { userId: user[0].id, username: user[0].login },
        secretKey,
        { expiresIn: "1h" }
      );

      res.json({
        message: "Authentication successful!",
        token,
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

exports.logout = async (req, res) => {
  const token = req.header("Authorization");
  //Destroy the token
  jwt.destroy(token);
  res.json({ message: "Logout successful!" });
};

function authenticateToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}
