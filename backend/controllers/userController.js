const { compare } = require('bcrypt');
const User = require('../models/userSchema');
const userService = require('../services/userService');
const { validationResult } = require('express-validator');
const  authUser  = require('../middlewares/auth.middleware');
const blacklistToken = require('../models/blacklistToken');
const jwt = require('jsonwebtoken')
module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  const isUserAlreadyExist= await User.findOne({email:req.body.email})
  if(isUserAlreadyExist){
    return res.status(400).json({message:"User already exist with this email."});
    }


  

    const { fullname, email, password } = req.body;


    

    const hashedPassword = await User.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });


}

module.exports.loginUser = async (req,res,next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
  const { email, password } = req.body;
  const user = await User.findOne({ email: email }).select('+password');
    if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });}
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({error: 'Invalid email or password' });}
  

    const token = user.generateAuthToken();
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1 hour
  })

    res.status(200).json({token,user});



};


module.exports.getUserProfile = async (req,res,next)=>{
  res.status(201).json({user:req.user})


}


module.exports.logoutUser= async (req,res,next)=>{
  res.clearCookie('token');

  const token = req.cookies.token || req.headers.authorization.split(' ')[1]
  await blacklistToken.create({token});
  
  res.status(200).json({message:'Logged out successfully'})
  

}