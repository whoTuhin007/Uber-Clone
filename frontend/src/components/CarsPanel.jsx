import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { UserDataContext } from '../context/UserContext';

const CarsPanel = ({ setcarSelectPanel, setconfirmRide, vehicle, setvehicle,setShowPanel }) => {
  const {fares} = useContext(UserDataContext)
  const rideStyles = {
    width: "100%",
    height: "120%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem",
  };
  const imgStyles = {
    width: "20%",
    objectFit: "cover",
  };
  const className = " active:border-black h-1/2 border-gray-100 border-2 rounded-lg";



  return (
    <div className='w-full h-[98vh] flex flex-col gap-4'>
      <h3
        onClick={() => {
          setcarSelectPanel(false);
        }} className="text-xl font-bold mb-5 ">
        Select Ride{" "}
        <i
          className="ri-arrow-down-wide-line right-6 text-2xl text-black "
        ></i>{" "}
      </h3>
      <div
        className={className}
        style={rideStyles}
        onClick={() => {
          setconfirmRide(true);
          setvehicle('car');
          setShowPanel(false)

        }}
      >
        <img
          style={imgStyles}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTDv21E5y6ihw1-vHUqdxl6N-JJbcwJF2F6oHuEprlIcevTcy4e12__YH-rN-GkLECDbA"
          alt="UberX Ride"
        />
        <h4>Uber Car</h4>
        <p>4.5 rating</p>
        <p> ₹{fares?.car || "0" }</p>
      </div>

      <div
        onClick={() => {
          setconfirmRide(true);
          setvehicle('auto');
          setShowPanel(false)
          
        }}
        style={rideStyles}
        className={className}
      >
        <img
          style={imgStyles}
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt=""
        />
        <h4>Uber Auto</h4>
        <p>4.5 rating</p>
        <p> ₹{fares?.auto || "0"}</p>
      </div>
      <div
        onClick={() => {
          setconfirmRide(true);
          setvehicle('motorcycle');
          setShowPanel(false)

          
        }}
        style={rideStyles}
        className={className}
      >
        <img
          style={imgStyles}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfZk9YnqF1LyugOEqiW3Wot1QKVZhVw202uQ&s"
          alt=""
        />
        <h4>Uber Moto</h4>
        <p>4.5 rating</p>
        <p> ₹{fares?.motorcycle || "0"}</p>
      </div>
    </div>
  );
};

// CarsPanel.propTypes = {
//   setcarSelectPanel: PropTypes.func.isRequired,
//   setconfirmRide: PropTypes.func.isRequired,
//   fares: PropTypes.shape({
//     motorcycle: PropTypes.number.isRequired,
//     auto: PropTypes.number.isRequired,
//     car: PropTypes.number.isRequired,
//   }).isRequired,
//   setfares: PropTypes.func.isRequired,
//   vehicle: PropTypes.string.isRequired,
//   setvehicle: PropTypes.func.isRequired,
// };

export default CarsPanel;
