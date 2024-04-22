const express = require('express');

const router = express.Router();
const userController = require('../controllers/usersController');

const catchError = (asyncFn) => {
  return (req, res, next) => {
    asyncFn(req, res, next)
      .catch((err) => {
        console.log('錯誤捕捉:', err)
        res.status(500)
          .send({
            message: '伺服器錯誤'
          })
      }) // Promise
  };
}

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
  catchError(userController.signup));

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
  catchError(userController.login));

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
  catchError(userController.profile));

module.exports = router;
