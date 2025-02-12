const captainModel = require('../models/captainModel');
const captainService = require('../services/captainService');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const blacklistToken = require('../models/blacklistToken');

module.exports.registerCaptain = async (req, res, next) => {
    const { fullname, email, password, vehicle } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const captainAlreadyExist = await captainModel.findOne({ email });
    if (captainAlreadyExist) {
        return res.status(400).json({ message: 'Captain already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const captainData = await captainService.createCaptain({
        fullname: fullname, // Assuming fullname is an object with firstname and lastname
        email: email,
        password: hashedPassword,
        color: vehicle.color,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
        plate: vehicle.plate
    });

    // Assuming generateAuthToken is a method defined in the captainModel schema
    const token = captainData.generateAuthToken();
    res.status(201).json({ captainData, token });
};


module.exports.loginCaptain = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log('Email:', email);
        console.log('Password:', password);

        const captain = await captainModel.findOne({ email }).select('+password');
        console.log('captain:', captain);

        if (!captain) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isValidPassword = await bcrypt.compare(password, captain.password);
        console.log('isValidPassword:', isValidPassword);

        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = captain.generateAuthToken();
        console.log('Token:', token);

        res.cookie('token', token); // Correctly set the cookie
        res.status(201).json({ token, captain });
    } catch (error) {
        console.error('Error:', error);
        next(error);
    }
};

module.exports.getCaptainProfile = async (req,res,next)=> {
    res.status(201).json({captain : req.captain})
}


module.exports.logoutCaptain = async (req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split( ' ')[1];
    await blacklistToken.create({token});
    res.clearCookie('token');
    res.status(201).json("logged out succesfully");


    
    
    



   
}
  
         



