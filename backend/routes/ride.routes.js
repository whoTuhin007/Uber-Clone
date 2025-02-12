const express = require('express');
const router = express.Router();
const {body,query} = require('express-validator');
const rideController = require('../controllers/ride.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');


router.post('/create', 
    AuthMiddleware.authUser,
    body('pickup').isString().isLength({min:3}).withMessage('invalid address'),
    body('destination').isString().isLength({min:3}).withMessage('invalid address'), 
    body('vehicleType').isString().isIn([
        'car',
        'auto',
        'motorcycle'
        

    ]).withMessage('invalid vehicle type'),

    
    rideController.createRide,



    
)

router.get('/get-fare',
    AuthMiddleware.authUser,
    query('pickup').isString().isLength({min:3}).withMessage('invalid address '),
    query('destination').isString().isLength({min:3}).withMessage('invalid address '),
    rideController.getFare


)

router.post('/confirm',
    AuthMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('invalid ride id'),
    body('captainId').isMongoId().withMessage(' invalid captain id'),
    rideController.confirmRide
)

router.post('/rideStarted',
    AuthMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('invalid ride id'),
    rideController.rideStarted
)
router.post('/completeRide',
    AuthMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('invalid ride id'),

    rideController.completeRide
)



module.exports = router;