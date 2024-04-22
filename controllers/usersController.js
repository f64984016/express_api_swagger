const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const key = "MYDEMOKEY";
const userModel = require('../models/usersModel');

exports.signup = async(req, res) => {
    const {email, username, password} = req.body;
    // Validation
    if(userModel.getByEmail(email)) {
      res.status(400).send({message: 'User already exist.'});
    }
    // 1-1 bcrypt password
    const hashpassword = await bcrypt.hash(password, 10)
    // 1-2 Password Storage
    userModel.create(email, username, hashpassword);
    // 1-3 Response
    res.status(201).send({message:'Register Successfully!'});
};

exports.login = async(req, res) => {
    const {email, password} = req.body;
    // 2-1 Verify User Exist
    const user = userModel.getByEmail(email);
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
};

exports.profile = async(req, res) => {
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
};

