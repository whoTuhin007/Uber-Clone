import img from "../assets/images.jpg";

import React, { useContext } from "react";
import { UserDataContext } from "../context/UserContext";

const ConfirmRide = ({
  setconfirmRide,
  setdriverSearch,

  setcarSelectPanel,

  setShowPanel,
  handleConfirmRide,
 
  vehicle,
  setvehicle,
  pickup,
  setPickup,
  destination,
  setDestination
}) => {

  const {fares} = useContext(UserDataContext)

  return (
    <div className=" flex-col flex w-full bg-white p-6 rounded-lg leading-tight overflow-scroll">
     
      <img
        className=" w-[40%] m-auto backdrop:bg-transparent bg-transparent bg-none"
        src={img}
        alt="UberX Ride"
      />
       <p className="text-xl font-bold leading-tight w-full text-left underline underline-offset-4 ">
        Confirm Your Ride
      </p>

      <div className="w-full  mb-4 flex flex-col  items-start gap-3 text-lg">
        <p className="border-b border-black mt-4 w-full  text-left">
          {" "}
          <i className="ri-map-pin-line mr-3"></i> <span className="font-bold">Pick Up Location:</span>{" "}  <br />
          <span className="text-gray-600">{pickup}</span>
        </p>
        <p className="border-b border-black mt-4 w-full text-left">
          {" "}
          <i className="ri-map-pin-line mr-3"></i> 
          <span className="font-bold">Destination:</span>{" "} <br />
          <span className="text-gray-600">{destination}</span>
        </p>
        <p className="border-b border-black mt-4 w-full text-left">
          {" "}
          <i className="ri-car-line mr-3"></i>
          <span className="font-bold">Vehicle:

            </span>{" "} 
            <span className="text-gray-600 capitalize">{vehicle}</span>
        </p>
        <p className="border-b border-black mt-4 w-full text-left">
          <i className="ri-wallet-3-line  mr-3"></i>
          <span className="font-bold"> ₹{fares[vehicle] || "0" }</span> <br />
          <span className="text-gray-600">Payment Mode : Cash,Online</span>
        </p>
      </div>

      <button
        onClick={() => {
          setdriverSearch(true);
          setconfirmRide(false);
          setShowPanel(false);

          setcarSelectPanel(false);
          handleConfirmRide()
        }}
        className="mt-2 bg-emerald-700 text-white  text-base font-bold w-3/4 rounded-lg px-8 m-auto py-2"
      >
        Confirm Ride <i className="ri-e-bike-line text-xl"></i>
      </button>
      <button
        onClick={() => {
          setconfirmRide(false);
          
        }}
        className="mt-2 bg-red-600 text-white  text-base font-bold w-3/4 rounded-lg px-8 m-auto py-2"
      >
        Cancel Ride
      </button>
    </div>
  );
};

export default ConfirmRide;
