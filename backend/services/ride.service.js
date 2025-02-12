const rideModel = require("../models/ride.schema");
const mapService = require("./maps.service");
const crypto = require('crypto');

async function getFare(pickup, destination) {
    const fareRate = {
        auto: { baseFare: 20, perKm: 10, perMin: 2 },
        car: { baseFare: 50, perKm: 15, perMin: 3 },
        motorcycle: { baseFare: 10, perKm: 5, perMin: 1 }
    };

    if (!pickup || !destination) {
        throw new Error("Pickup and Destination are required");
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    // Extracting distance (handles float values properly)
    const distance = parseFloat(distanceTime.distance.replace(/[^\d.]/g, ""));

    // Extracting time (handles both "X min" and "X hr Y min" cases)
    const timeParts = distanceTime.duration.match(/(\d+)\s*hour[s]?|\s*(\d+)\s*min/g);
    let time = 0;

    if (timeParts) {
        for (let part of timeParts) {
            if (part.includes("hour")) {
                time += parseInt(part) * 60; // Convert hours to minutes
            } else {
                time += parseInt(part);
            }
        }
    }

    // Calculate fare for each vehicle type
    const arrayOfFare = {
        auto: fareRate.auto.baseFare + (fareRate.auto.perKm * distance) + (fareRate.auto.perMin * time),
        car: fareRate.car.baseFare + (fareRate.car.perKm * distance) + (fareRate.car.perMin * time),
        motorcycle: fareRate.motorcycle.baseFare + (fareRate.motorcycle.perKm * distance) + (fareRate.motorcycle.perMin * time)
    };

    return arrayOfFare;
}


module.exports.getFare = getFare;





function generateOTP(length) {
    return Array.from(crypto.randomBytes(length))
        .map(byte => (byte % 10).toString())
        .join('');
}

function getOtp(num) {
    return generateOTP(num);
}

module.exports.getOtp = getOtp;

module.exports.createRide = async (
    {
        user,
        pickup,
        destination,
        vehicleType,


    }
) => {


    try {

        const fare = await getFare(pickup, destination);



        const ride = await rideModel.create({
            user,
            pickup,
            destination,
            vehicleType,
            fare: fare[vehicleType],
            otp: getOtp(6),

        });
        return ride



    } catch (error) {
        return  error.message ;
    }
}



module.exports.confirmRide = async (rideId, captainId) => {
    try {
        console.log("captainId:", captainId, "rideId:", rideId);

        // Validate input
        if (!rideId || !captainId) {
            return { status: 400, message: "Ride ID and Captain ID are required" };
        }

        // Update the ride with captain ID and change status to 'accepted'
        const updatedRide = await rideModel.findOneAndUpdate(
            { _id: rideId },
         { status: "accepted", captain: captainId } , // Correct update format
          
        );

        if (!updatedRide) {
            return { status: 404, message: "Ride not found" };
        }

        // Fetch ride details after update
        const ride = await rideModel.findOne({ _id: rideId })
            .populate('user')
            .populate('captain')
            .select('+otp'); // Include the OTP field

        return ride ; // Return the updated ride object

    } catch (error) {
        console.error("Error confirming ride:", error);
        return { status: 500, message: "Internal server error" };
    }
};


module.exports.startRide = async (rideId) => {
    try {
        console.log("rideId in ride service is:", rideId);

        // Validate input
        if (!rideId) {
            return { status: 400, message: "Ride ID is required" };
        }

        // Fetch the ride
        const ride = await rideModel.findOne({ _id: rideId });
        if (!ride) {
            return { status: 404, message: "Ride not found" };
        }

        console.log(ride.pickup, ride.destination);

        // Get distance and time using map service
        const distanceTime = await mapService.getDistanceTime(ride.pickup, ride.destination);

        console.log("distanceTime in ride service is:", distanceTime);

        const duration = distanceTime.duration;
        const distance = distanceTime.distance;

        // Update the ride status, distance, and duration
        const updatedRide = await rideModel.findOneAndUpdate(
            { _id: rideId },
            {
                $set: {
                    status: "ongoing",
                    distance: distance,
                    duration: duration,
                },
            },
            { new: true } // Returns the updated document
        ) .populate('user')
        .populate('captain')
        .select('+otp');

        return updatedRide;
    } catch (error) {
        console.error("Error starting ride:", error);
        return { status: 500, message: "Internal server error" };
    }
};


module.exports.completeRide= async (rideId)=>{
    if(!rideId){
        return { status: 400, message: "Ride ID is required" };
    }
    console.log('rideId in complete ride is:', rideId)
    try{
        const ride = await rideModel.findOne({ _id: rideId });
        if (!ride) {
            return { status: 404, message: "Ride not found" };
            }
        console.log('ride in complete ride is :', ride)
        // Update the ride status to completed
        const completedRide =  await rideModel.findOneAndUpdate(
            { _id: rideId },
            {
                $set: {
                    status: "completed",
                    
                },
            },
            { new: true } // Returns the updated document
        ) .populate('user')
        .populate('captain')
        .select('+otp');
        return completedRide;

    }
    catch(err){
        console.error("Error completing ride:", err);
        return { status: 500, message: "Internal server error" };
    }
    
  
}