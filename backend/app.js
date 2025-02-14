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
app.use(cors({ origin: ['https://backend-270ii71l3-whotuhin007s-projects.vercel.app','*','https://frontend-oqdc0pdqx-whotuhin007s-projects.vercel.app '] ,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  
}));
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
