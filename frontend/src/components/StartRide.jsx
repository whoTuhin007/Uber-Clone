import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const StartRide = ({ confirmRide, setconfirmRide, setRidePanel, ride ,otp}) => {
  const navigate = useNavigate();
  const {token} = useContext(CaptainDataContext)
  const [verified, setVerified] = useState(false);
  const [updatedRide,setUpdatedRide]= useState(null)
  const [OTP,setOTP] = useState("") 
  const verifyOtp = () => {
 

    if (OTP === otp) {
      toast.success("OTP verified successfully!", { position: "top-center" });
      setVerified(true);

    } else {
      toast.error("Invalid OTP! Please enter a 6-digit code.", {
        position: "top-center",
      });
      setVerified(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verified) {
      toast.error("Please verify OTP first!", { position: "top-center" });
      return; // Stops navigation if OTP isn't verified
    }
    try{
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/rideStarted`,
        {
          rideId: ride?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUpdatedRide(response.data)
      navigate("/captain-riding", {state :{updatedRideCaptain:response.data}}  );
   
    }
    catch(error){
      console.log(error);
      }

     // Navigate only when OTP is verified
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-between items-center bg-yellow-400 rounded-lg p-2 w-full">
        <span className="flex gap-3 justify-center items-center">
          <img
            className="rounded-full object-cover w-16 h-16"
            src="https://media.istockphoto.com/id/523048762/photo/portrait-of-a-woman-outdoors-in-a-park.jpg?s=612x612&w=0&k=20&c=v7NpJMt8bs5ls7K9og1C43g8kAlBHiQwcS_I3rus3qc="
            alt=""
          />
          <span className="text-slate-950 font-bold text-xl">
            {ride?.user?.fullname?.firstname + " " + ride?.user?.fullname?.lastname}
          </span>
        </span>
        <p className="text-xl font-bold"> 2.3 KM </p>
      </div>

      <div className="w-full mb-4 flex flex-col items-start gap-3 text-lg">
        <p className="border-b border-black mt-4 w-full text-left">
          <i className="ri-map-pin-line mr-3 font-bold text-gray-950"> Pickup :</i> <br />
          <span className="text-gray-600 capitalize font-bold text-lg">{ride?.pickup}</span>
        </p>
        <p className="border-b border-black mt-4 w-full text-left">
          <i className="ri-map-pin-line mr-3 font-bold text-gray-950"> Destination :</i> <br />
          <span className="text-gray-600 capitalize font-bold text-lg">{ride?.destination}</span>
        </p>
        <p className="border-b border-black mt-4 w-full text-left">
          <i className="ri-wallet-3-line mr-3 font-bold text-slate-950"> Amount</i> <br />
          <span className="text-2xl font-bold text-slate-600">₹{ride?.fare}</span>
        </p>
      </div>

      <form className="w-full p-4 text-center flex flex-col gap-4" onSubmit={handleSubmit}>
        <label htmlFor="OTP" className="text-2xl font-bold">
          Enter OTP to start Ride!
        </label>
        <div className="flex w-full justify-center gap-8">
          <input
            id="OTP"
            onChange={(e) => setOTP(e.target.value)}
            value={OTP}
            type="text"
            maxLength={6}
            placeholder="Enter 6-digit OTP"
            className="bg-slate-900 rounded-lg w-1/2  placeholder:text-lg placeholder:text-white text-white p-4"
          />
          <button
            type="button"
            onClick={verifyOtp}
            className="bg-emerald-600 p-2 rounded-lg text-lg font-bold text-white"
          >
            Confirm OTP
          </button>
        </div>
      </form>

      <div className="flex flex-col w-full justify-center items-center gap-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 text-center text-white rounded-lg p-2 w-3/4 text-lg font-bold"
        >
          Start Ride
        </button>
        <button
          onClick={() => {
            setconfirmRide(false);
            setRidePanel(false);
          }}
          className="bg-red-600 text-white rounded-lg p-2 w-3/4 text-lg font-bold"
        >
          Cancel Ride
        </button>
      </div>
    </>
  );
};

export default StartRide;
