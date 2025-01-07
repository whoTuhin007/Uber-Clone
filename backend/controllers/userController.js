const { compare } = require('bcrypt');
const User = require('../models/userSchema');
const userService = require('../services/userService');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
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
    res.status(200).json({token,user});



}

