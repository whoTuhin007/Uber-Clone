import { Link, useLocation, useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import { ToastContainer, toast } from "react-toastify";
import { useContext, useEffect, useState, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import { SocketContext } from "../context/socketContext";

const Riding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sendMessage, receiveMessage } = useContext(SocketContext);
  
  const [started, setStarted] = useState(false);
  const [ride, setRide] = useState(null);
  const [shown, setShown] = useState(false);
  const toastShown = useRef(false);
  const [error,seterror] = useState(false)

  useEffect(() => {
    
    const startedState = location.state?.started || false;
    const showPage = location.state?.showPage || false;
    const rideData = location.state?.ride || null;
    const updatedRide = location.state?.updatedride || null;
    if (showPage == false) {
      seterror(true);
      setTimeout(() => {
        navigate('/home');
      }, 4000);
      return;
    }
  

    
    if (updatedRide) {
      setRide(updatedRide);
    } else if (rideData) {
      setRide(rideData);
    } else {
      setRide(null);
    }

    if (startedState) {
      setStarted(true);
      toast.success("Your Ride has Started!", { position: "top-center" });
    }

    receiveMessage("ride-ended", () => {
      setShown(true);
      setTimeout(() => navigate("/home"), 5000);
    });
  }, [navigate, receiveMessage, location.state]);

  if (error) {
    return <div className="text-center text-xl font-bold mt-10">No Ride Found. Redirecting to Home...</div>;
  }
  

  return (
    <div className="w-full h-full relative bg-gray-100">
      <ToastContainer />
      {!started && (
        <div className="absolute top-0 left-0 p-4 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
            <div className="text-3xl font-bold text-gray-800 mb-4 p-10">
              Ride Has Not Started Yet!
            </div>
          </div>
        </div>
      )}
      {shown && (
        <div className="absolute top-0 left-0 p-4 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
            <div className="text-3xl font-bold text-gray-800 mb-4 p-10">
              Your ride has completed, redirecting to home!
            </div>
          </div>
        </div>
      )}
      
      <Link to="/home" className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-gray-200 transition duration-300">
        <i className="ri-home-3-line text-3xl text-gray-700"></i>
      </Link>
      
      <img
        src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        className="w-full h-[45vh] object-cover"
        alt="Ride Animation"
      />
      
      <div className="w-full h-[55vh] p-4">
        <div className="w-full flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
          <img
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png"
            alt="Captain"
            className="w-20 h-20 rounded-full border-2 border-gray-300"
          />
          
          <div className="text-right flex-1 ml-4">
            <p className="text-lg font-semibold text-gray-800">
              {ride?.captain?.fullname?.firstname || "Unknown Captain"}
            </p>
            <p className="text-2xl font-bold text-gray-900 font-serif">
              {ride?.captain?.plate || "N/A"}
            </p>
            <p className="text-gray-600">
              {ride?.captain?.vehicleType || "Vehicle Type N/A"}
            </p>
            {!started && ride?.otp && (
              <p className="text-red-600 font-bold text-xl">OTP: {ride.otp}</p>
            )}
          </div>
        </div>
        
        <div className="w-full text-center p-4 font-serif bg-white mt-4 shadow-lg rounded-lg">
          <p className="border-b border-gray-300 pb-2 text-left flex items-center gap-2 text-lg font-medium">
            <i className="ri-map-pin-line text-emerald-700 text-2xl"></i>
            {ride?.destination || "Unknown Destination"}
          </p>
          
          <p className="mt-4 text-left flex items-center gap-2 text-lg font-medium">
            <i className="ri-wallet-3-line text-yellow-600 text-2xl"></i>₹
            {ride?.fare || "0.00"} <span className="text-gray-700 text-sm">Cash</span>
          </p>
          
          {ride?.distance && ride?.duration && (
            <div className="mt-4 text-left text-lg font-medium">
              <p>Distance: {ride?.distance || "0.00 km"}</p>
              <p>Time: {ride?.duration || "0.00 minutes"}</p>
            </div>
          )}
          
          <button className="mt-6 bg-emerald-700 hover:bg-emerald-800 text-white text-lg font-semibold w-full rounded-lg px-6 py-3 transition duration-300 shadow-md">
            Pay Now <i className="ri-e-bike-line text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Riding;
