const mongoose = require('mongoose');


async function connectToDb() {
  await mongoose.connect('mongodb://127.0.0.1:27017/uberClone').then(() => {
        console.log('Connected to DB');
    }).catch(err => console.log(err));
}


module.exports = connectToDb;