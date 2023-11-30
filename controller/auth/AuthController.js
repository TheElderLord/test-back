const connection = require('../../db/connection');
const moment = require('moment');

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const express = require('express')

const app = express();
const secretKey = 'sit'; // Replace with your actual secret key

app.use(bodyParser.json());


exports.login = async (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await query('SELECT * FROM users WHERE login = ? AND password = ?', [username, password]);
    // console.log(username, password)
    if (user && user.length > 0) {
      const sql = `Update users SET sign_in_date = '${moment().format('YYYY-DD-MM HH:mm:ss')}' WHERE id = ${user[0].id}`;
      await query(sql);
      // Generate a JWT token
      const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
  
      res.json({ 
        message: 'Authentication successful!',
        token,
        user: {
          id: user[0].id,
          username: user[0].login,
        },
       });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
};

exports.logout = async (req, res) => {
    const token = req.header('Authorization');
    //Destroy the token
    jwt.destroy(token);
    res.json({ message: 'Logout successful!' });
};


function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
  
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

function query(sql, values) {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

