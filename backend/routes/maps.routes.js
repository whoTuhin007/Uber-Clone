const express = require('express');
const router = express.Router();
const mapController = require('../controllers/maps.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');
const {query} = require('express-validator');

router.get('/get-coordinates',
    query('address').isString().isLength({min:3})
    ,
     AuthMiddleware.authUser , mapController.getAddressCoordinates);

router.get('/get-distance-time',
    query('origin').isString().isLength({min:3}),
    query('destination').isString().isLength({min:3})
    ,
     AuthMiddleware.authUser , mapController.getDistanceTime);

router.get('/get-suggestions',
    query('input').isString().isLength({min:3})
    ,
     AuthMiddleware.authUser , mapController.getAutoCompleteSuggestions);
    



module.exports = router;