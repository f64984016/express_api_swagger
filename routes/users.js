const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

const key = "MYDEMOKEY";

const users = {
  "f64984016@mail.com":{
    "username": "rick",
    "password": ""
  }
};

// 1.Register
router.post('/signup',async(req, res) => {
  const {email, username, password} = req.body;
  // Validation
  if(users[email]) {
    res.status(400).send('User already exist.');
  }
  // 1-1 bcrypt password
  const hashpassword = await bcrypt.hash(password, 10)
  // 1-2 Password Storage
  users[email] = {
    password: hashpassword,
    username
  };
  // 1-3 Response
  res.status(201).send({message:'Register Successfully!'});
});

// 2.Login
router.post('/login',async(req, res) => {
  const {email, password} = req.body;
  // 2-1 Verify User Exist
  const user = users[email];
  if (!user) {
    return res.status(401).send({error: 'User Not Found.'});
  }
  // 2-2 Password Confirm
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).send({error: 'Login Error.'});
  }
  // 2-3 JWT Sign
  const token = jwt.sign({
    email,
    username: user.username
  }, key);
  // 2-4 Response
  return res.send({
    messgae:'Success',
    token
  });
});

// 3.AuthenticateUser

module.exports = router;
