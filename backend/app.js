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
app.use(cors({ origin:'https://frontend-991ipje4h-whotuhin007s-projects.vercel.app/',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
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
