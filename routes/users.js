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
router.post('/signup',
    /* 	#swagger.tags = ['User']
        #swagger.description = '註冊' */
    /*	#swagger.parameters['body'] = {
        in: 'body',
        description: '註冊資訊',
        required: true,
        schema: {
            "email": "電子郵件",
            "username": "使用者名稱",
            "password": "密碼"
          }
    } */
    /* #swagger.responses[201] = { 
          schema: { "message": "Register Successfully!" }
        } */
    /* #swagger.responses[400] = { 
          schema: { "message": "User already exist." }
        } */
  async(req, res) => {
  const {email, username, password} = req.body;
  // Validation
  if(users[email]) {
    res.status(400).send({message: 'User already exist.'});
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
router.post('/login', 
    /* 	#swagger.tags = ['User']
        #swagger.description = '登入' */
    /*	#swagger.parameters['body'] = {
        in: 'body',
        description: '登入資訊',
        required: true,
        schema: {
            "email": "電子郵件",
            "password": "密碼"
          }
    } */
    /* #swagger.responses[401] = { 
          schema: { "error": "User Not Found." }
        } */
    /* #swagger.responses[401] = { 
          schema: { "error": "Login Error." }
        } */
    /* #swagger.responses[200] = { 
          schema: { 
            "message": "Success",
            "token": "token的內容" }
        } */
        async(req, res) => {
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

// 3.Authentication
router.get('/profile', 
    /* 	#swagger.tags = ['User']
        #swagger.description = '認證' */   
    /*  #swagger.responses[200] = { 
          schema: {
              "message": "Success",
              "user": {
                  "email": "電子郵件地址",
                  "username": "使用者名稱",
                  "iat": 123456
              }
          }
        } */
    /*  #swagger.responses[401] = { 
          schema: {
              "error": "No sign in"
          }
        } */
    /*  #swagger.responses[403] = { 
          schema: {
              "error": "Auth fail"
          }
        } */
        (req, res) => {
  const token = req.headers['authorization'];
  // 3-1 Verify whether request contain token 
  if (!token) {
    return res.status(401).send({
      error: "No sign in"
    });
  }
  // 3-2 Authentication
  jwt.verify(token, key, (err, user) => {
    if (err) {
      return res.status(403).send({
        error: "Auth fail."
      });      
    }
    res.send({
      message: "Success",
      user
    });
  });
});

module.exports = router;
