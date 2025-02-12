import React, { useContext } from "react";
import PropTypes from 'prop-types';
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainDetails = ({ setRidePanel,newRide }) => {
  const { captain,token,setToken } = useContext(CaptainDataContext);

  // Ensure captain & fullname exist before accessing properties
  const firstname = captain?.fullname?.firstname || "";
  const lastname = captain?.fullname?.lastname || "";

  return (
    <>
      <div className="flex justify-between items-center bg-yellow-400 rounded-lg p-2">
        <span className="flex gap-3 justify-center items-center">
          <img
            className="rounded-full object-cover w-16 h-16"
            src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
            alt="Profile"
          />
          <h1 className="text-xl font-bold">{firstname + " " + lastname}</h1>
        </span>
        <span className="flex-col flex">
          <p className="text-xl font-bold"> $1200.3</p>
          <p className="text-gray-800 font-normal text-base">Earned</p>
        </span>
      </div>

      <div className="bg-[#6c69695e] rounded-lg flex justify-between mt-6 items-center p-3 w-full gap-3 text-base font-semibold">
        <span className="flex flex-col justify-center items-center">
          <i className="ri-speed-up-line text-2xl"></i>
          <p>10.3</p>
          <p>Hours Online</p>
        </span>
        <span className="flex flex-col justify-center items-center">
          <i className="ri-speed-up-line text-2xl"></i>
          <p>10.3</p>
          <p>Hours Online</p>
        </span>
        <span className="flex flex-col justify-center items-center">
          <i className="ri-speed-up-line text-2xl"></i>
          <p>10.3</p>
          <p>Hours Online</p>
        </span>
      </div>

      <button
        onClick={() => setRidePanel(true)}
        role="button"
        aria-label="Show Rides"
        disabled={!newRide}
        
        className="flex gap-4 m-auto w-1/2 bg-[#000000] text-white rounded-2xl p-2 justify-center items-center mt-4"
      >
        <i className="ri-takeaway-fill text-3xl text-white"></i>
        {`${newRide? "Show Ride" : "No Ride"}`}
        
      </button>
    </>
  );
};

CaptainDetails.propTypes = {
  setRidePanel: PropTypes.func.isRequired,
};

export default CaptainDetails;
