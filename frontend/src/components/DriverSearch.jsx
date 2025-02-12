import React, { useContext } from "react";
import img from "../assets/images.jpg";
import { UserDataContext } from "../context/UserContext";

const DriverSearch = ({ driverSearchRef,
    setdriverSearch,
    driverSearch,
    carSelectPanel,
    setcarSelectPanel,
    confirmRide,
    setconfirmRide ,
  
    vehicle,
    setvehicle,
    pickup,
    setPickup,
    destination,
    setDestination  }) => { 

      const {fares} = useContext(UserDataContext)

      
   

  return (
    <div 

     className=" flex-col flex w-full bg-white p-4 rounded-lg ">
      
      <img
        className=" w-3/4 m-auto backdrop:bg-transparent bg-transparent bg-none"
        src={img}
        alt="UberX Ride"
      />
      <p className="text-xl font-bold leading-tight w-full text-center  border-b border-black  ">
        Searching For Drivers ....
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
          <span className="font-bold"> ₹{fares[vehicle] || "0"}</span> <br />
          <span className="text-gray-600">Payment Mode : Cash,Online</span>
        </p>
      </div>

   
    </div>
  );
};

export default DriverSearch;
