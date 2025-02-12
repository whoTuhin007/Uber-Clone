const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controller');
const { body } = require('express-validator');
const AuthMiddleware = require('../middlewares/auth.middleware');
router.post('/register', [
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('vehicle.capacity').isLength(
        { min: 1 }).withMessage('Capacity must atleast 1'),
    body('vehicle.color').isLength(
        { min: 3 }).withMessage('Color must atleast 1'),



    body('vehicle.plate').isLength(
        { min: 3, max: 20 }).withMessage('License plate must be between 3 and 20 characters'),
    body('vehicle.vehicleType').isIn(['car', 'auto', 'motorcycle']).withMessage('Not valid vehicle type'),





    body('password').isLength({ min: 8 }).withMessage('Password must be atleast 8 characters'),


],
    captainController.registerCaptain



)

router.post('/login',
    [
        body('email').isEmail().withMessage('Invalid email'),
        body('password').isLength({ min: 8 }).withMessage('Password must be atleast 8 characters'),
    ]
    , captainController.loginCaptain)


router.get('/profile',
    AuthMiddleware.authCaptain

    ,

    captainController.getCaptainProfile
)


router.get('/logout',
    AuthMiddleware.authCaptain,
    captainController.logoutCaptain





)






module.exports = router;
