const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_SECRET;
const bcrypt = require('bcrypt')
const User = require('../models/userSchema');
const captainModel = require('../models/captainModel');
const blacklistToken = require('../models/blacklistToken');


module.exports.authUser = async (req, res, next) => {
    let token;
    console.log(req.cookies)

    // Try to get the token from cookies or authorization header
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;

    } else if (req.headers.authorization) {
        const authHeaderParts = req.headers.authorization.split(' ');
        if (authHeaderParts[0] === 'Bearer' && authHeaderParts[1]) {
            token = authHeaderParts[1];
        }
    }
    const isBlacklisted = await User.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({
            message: 'Unauthorized User',
        })
    };


    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized User 1',
        });
    }

    try {
        const decode = jwt.verify(token, JWT_KEY);
        const user = await User.findById({ _id: decode._id });
        if (!user) {
            return res.status(401).json({
                message: 'User not found',
            });
        }
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized User 2',
            error: error.message,
        });
    }
}


module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    console.log("token:", token)
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized User' });
    }
    const isBlacklisted = await blacklistToken.findOne({ token: token });
    console.log("blacklisted:", isBlacklisted)
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized User' });
    }
    
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decode)
        const captain = await captainModel.findById({ _id: decode._id });
        if (!captain) {
            return res.status(401).json({ message: 'Captain not found' });
        }
        req.captain = captain;
        console.log(req.captain)
    
        next();

    }
    catch (err) {
        console.log('try catch error:', err)
        return res.status(401).json({ message: 'Unauthorized User' })

            ;

    }
}






