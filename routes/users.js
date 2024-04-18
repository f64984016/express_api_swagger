const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

const users = {
  "f64984016@mail.com":{
    "username": "rick",
    "password": ""
  }
};

// 1.Register
router.post('/signup',async(req, res) => {
  const {email, username, password} = req.body;
  console.log(email, username, password);

  if(users[email]) {
    res.status(400).send('User already exist.');
  }
  // 1-1 bcrypt password
  const hashpassword = await bcrypt.hash(password, 10)
  console.log(hashpassword);

  // 1-2 Password Storage
  users[email] = {
    password: hashpassword,
    username
  };
  console.log(users);
  // 1-3 Response
  res.status(201).send({message:'Register Successfully!'});
});

// 2.Login

// 3.AuthenticateUser

module.exports = router;
