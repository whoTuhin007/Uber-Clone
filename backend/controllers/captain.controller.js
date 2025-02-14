const captainModel = require('../models/captainModel');
const captainService = require('../services/captainService');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const blacklistToken = require('../models/blacklistToken');
module.exports.registerCaptain = async (req, res, next) => {
    try {
        const { fullname, email, password, vehicle, location } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const captainAlreadyExist = await captainModel.findOne({ email });
        if (captainAlreadyExist) {
            return res.status(400).json({ message: 'Captain already exists with this email' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Ensure location is in the correct GeoJSON format
        if (!location || !location.coordinates || location.coordinates.length !== 2) {
            return res.status(400).json({ message: "Invalid location format. Expected { type: 'Point', coordinates: [lng, lat] }" });
        }

        const captainData = await captainService.createCaptain({
            fullname: fullname, // { firstname, lastname }
            email: email,
            password: hashedPassword,
            color: vehicle.color,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType,
            plate: vehicle.plate,
            location: {
                type: "Point", // Required for GeoJSON format
                coordinates: location.coordinates // [longitude, latitude]
            }
        });

        // Generate authentication token
        const token = captainData.generateAuthToken();
        res.status(201).json({ captainData, token });
        
    } catch (error) {
        console.error("Error registering captain:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};


module.exports.loginCaptain = async (req, res, next) => {
    try {
        const { email, password } = req.body;
    

        const captain = await captainModel.findOne({ email }).select('+password');

        if (!captain) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isValidPassword = await bcrypt.compare(password, captain.password);

        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = captain.generateAuthToken();

        res.cookie('token', token); // Correctly set the cookie
        res.status(201).json({ token, captain });
    } catch (error) {
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
  
         



