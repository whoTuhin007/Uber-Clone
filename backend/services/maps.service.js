const axios = require('axios')
const captainModel = require('../models/captainModel')

module.exports.getAddressCoordinates = async (address) => {
    try {
        const response = await axios.get(`https://maps.gomaps.pro/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`)
        if (response.data.status == "OK") {
            const location = response.data.results[0].geometry.location
            return {
                ltd: location.lat,
                lng: location.lng
            }
        }
        else {
            throw new Error("Invalid Address");
        }

    } catch (error) {
        throw error;
    }
}


module.exports.getDistanceTime = async (pickup, destination) => {
    if (!pickup || !destination) {
        throw new Error("pickup and Destination are required");
    }
    try {
        const response = await axios.get(`https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${pickup}&destinations=${destination}&key=${process.env.GOOGLE_MAPS_API_KEY}`)
        if (response.data.status == "OK") {

            const data = response.data.rows[0].elements[0]
            if (

                data.status == "ZERO_RESULTS" 
    
            ) {
                throw new Error("Invalid Address");
            }

            return {
                distance: data.distance.text,
                duration: data.duration.text
            }
        }
        else {
            throw new Error("Invalid Address");
        }
    } catch (error) {
        throw error;
    }
}


module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error("Input is required");
    }
    
    try {
        const response = await axios.get(`https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${input}&key=${process.env.GOOGLE_MAPS_API_KEY}`)
        if (response.data.status == "OK") {
            return response.data.predictions.map(prediction => prediction.description)
        }
        else {
            throw new Error("Invalid Address");
        }
    } catch (error) {
        throw error;
    }
}


module.exports.findCaptainsInTheRadius = async (ltd, lng, radius) => {



    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, ltd], 1000 / 6371]
            }
        }
    });

    return captains;
};

