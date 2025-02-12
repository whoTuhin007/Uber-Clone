const captainModel = require('../models/captainModel')




module.exports.createCaptain = async ({
    fullname,email,password,color,plate,capacity,vehicleType
    



}

)=>{
    if (!fullname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('Please fill in all fields')
        }
        const captain = await captainModel.create({
            fullname,
            email,
            password,
            
                color,
                plate,
                capacity,
                vehicleType
            
            })

            return captain;



    }
    
