const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectToDB = require('./db/db');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const captainRoutes = require('./routes/captain.routes');
const mapRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');







connectToDB();


const app = express();
app.use(cors({ origin: '*' }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRoutes);
app.use( '/captain',captainRoutes);
app.get('/', (req, res) => {
  res.send('Listening');
});
app.use('/maps', mapRoutes);
app.use('/rides',rideRoutes)

// Use the router


module.exports = app;
