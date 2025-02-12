const mongoose = require('mongoose');


const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true
    },
    captain: {
        type:  mongoose.Schema.Types.ObjectId,
      
      
        ref:"captain",
   
    },
    pickup: {
        type: String,
        
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    fare: {
        type: Number,
        default: null
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'ongoing' , 'completed', 'cancelled'],
        default: 'pending'
    },
    
    distance: {
        type: String,
        default: null
    },//in metres
   
    duration: {
        type: String,
        default: null
    },
    paymentId:{
        type: String,
        default: null
    },
    orderId:{
        type: String,
        default: null   
    },
    signature:{
        type: String,
        default: null
    },
    otp:{
        type: String,
        select:false,
        required:true,
    }


});



module.exports = mongoose.model('ride', rideSchema);