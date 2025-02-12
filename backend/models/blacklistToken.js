const mongoose = require('mongoose');

// Define the schema for the blacklist token
const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // 24 hours in seconds
  }
});

// Create the model from the schema
module.exports =  mongoose.model('BlacklistToken', blacklistTokenSchema);

