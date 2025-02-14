const rideService = require('../services/ride.service');
const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require("../models/ride.schema");

module.exports.createRide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { pickup, destination, vehicleType } = req.body;

        // 1. Get pickup coordinates
        const pickupCoordinates = await mapService.getAddressCoordinates(pickup);
        if (!pickupCoordinates) {
            return res.status(400).json({ message: "Invalid pickup location" });
        }

   


        // 2. Find available captains in the radius (2km)
        const captainsInRadius = await mapService.findCaptainsInTheRadius(
            pickupCoordinates.ltd,
            pickupCoordinates.lng,
            2
        );


        // 3. Create Ride only after validating locations
        const ride = await rideService.createRide({
            user: req.user._id,
            pickup,
            destination,
            vehicleType
        });
        ride.otp = "";

        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');

        captainsInRadius.map(async (captain) => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })

        })

        res.status(201).json(ride);
    } catch (error) {
        return res.status(500).json({ message: "Ride not created", error: error.message });
    }
};

module.exports.getFare = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { pickup, destination } = req.query;

        // Ensure both locations exist
        if (!pickup || !destination) {
            return res.status(400).json({ message: "Pickup and destination are required" });
        }

        const fare = await rideService.getFare(pickup, destination);

        return res.status(200).json({ fare });
    } catch (error) {
        return res.status(500).json({ message: "Fare not found", error: error.message });
    }
};


module.exports.confirmRide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, captainId } = req.body;
    try {
        const ride = await rideService.confirmRide(rideId, captainId);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })
        return res.status(200).json({ ride });
    } catch (error) {
        return res.status(500).json({ message: "Ride not confirmed", error: error.message });
    }




}



module.exports.rideStarted = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body



    try {
        const updatedRideDetails = await rideService.startRide(
            rideId
        )
        sendMessageToSocketId(updatedRideDetails.user.socketId, {
            event: 'ride-started',
            data: updatedRideDetails
        })
        return res.status(200).json({ updatedRideDetails });

    }
    catch (error) {
        return res.status(500).json({ message: "Ride not started", error: error.message });
    }

}







module.exports.completeRide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId } = req.body;
    try {
        const rideEnded = await rideService.completeRide(
            rideId

        )
        sendMessageToSocketId(rideEnded.user.socketId, {
            event: 'ride-ended',
            data: rideEnded
        })
        return res.status(200).json({ rideEnded });
    }
    catch (error) {
        return res.status(500).json({
            message: "Ride not ended", error: error.message
        });
    }


}
