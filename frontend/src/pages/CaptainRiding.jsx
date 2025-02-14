import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainRiding = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(false); // Prevent multiple API calls
  const location = useLocation()
  const {token,setToken} = useContext(CaptainDataContext)

  const endRide = async () => {
    if (!ride) return;
    

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/completeRide`,
        { rideId: ride?.updatedRideDetails?._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/captainHome"); // Navigate only after a successful API response
    } catch (error) {
      console.error("Error completing ride:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const rideData = location.state?.updatedRideCaptain || null;

    if (!rideData || Object.keys(rideData).length === 0) {
      setError(true);
      setTimeout(() => navigate("/captainHome"), 2000);
    } else {
      setRide(rideData);

    }
  }, [navigate,location.state]);

  if (error) {
    return <div className="text-center text-xl font-bold mt-10">No Ride Found. Redirecting to Captain Home...</div>;
  }

  return (
    <div className="w-screen h-screen">
      {/* Logo */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
        className="absolute top-5 left-5 w-20"
      />

      {/* Live Tracking Map */}
      <LiveTracking />

      {/* Ride Summary */}
      <div className="w-full h-[40%] bg-yellow-500 rounded-t-lg flex justify-between absolute bottom-0 items-center p-2">
        <h1 className="absolute top-0 text-center text-3xl w-full">
          <i className="ri-arrow-up-wide-line"></i>
        </h1>

        <div className="mt-6 w-full flex flex-col gap-3 justify-between p-2 items-center">
          <div className="flex flex-col w-full gap-3">
            <p className="text-2xl font-bold">
              <i className="ri-road-map-line"></i> Distance: {ride?.updatedRideDetails?.distance || "N/A"}
            </p>
            <p className="text-2xl font-bold">
              <i className="ri-wallet-3-line"></i> Amount: ₹ {ride?.updatedRideDetails?.fare || "N/A"}
            </p>
            <p className="font-bold">
              Payment Status: {ride?.updatedRideDetails?.paymentId ? "Paid" : "Not Paid"}
            </p>
          </div>

          <button
            onClick={endRide}
            disabled={loading}
            className="px-6 text-center flex justify-center items-center rounded-lg h-11 bg-green-600 text-lg font-bold disabled:bg-gray-400"
          >
            {loading ? "Completing..." : "Complete Ride"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaptainRiding;
