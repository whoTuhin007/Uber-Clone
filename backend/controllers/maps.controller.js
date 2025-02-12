const mapService = require('../services/maps.service');
const {validationResult} = require("express-validator")


module.exports.getAddressCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { address } = req.query;
        const coordinates = await mapService.getAddressCoordinates(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: "Coordinates not found" });
    }
}


module.exports.getDistanceTime = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { origin, destination } = req.query;
        const distanceTime = await mapService.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);
    } catch (error) {
        res.status(404).json({ message: "Distance and Time not found" });
    }
}

module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
   
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { input } = req.query;
        const suggestions = await mapService.getAutoCompleteSuggestions(input);
        res.status(200).json(suggestions);
    } catch (error) {
        res.status(404).json({ message: "Suggestions not found" });
    }
}