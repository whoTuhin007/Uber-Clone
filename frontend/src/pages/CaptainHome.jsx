import React, { useRef, useState, useEffect, useContext } from "react";
import { gsap } from "gsap";
import "remixicon/fonts/remixicon.css";
import axios from "axios";

import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import StartRide from "../components/StartRide";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socketContext";
import { io } from "socket.io-client";
import LiveTracking from "../components/LiveTracking";
const socket = io(`${import.meta.env.VITE_BASE_URL}`);

const CaptainHome = () => {
  const ridePanelRef = useRef(null);
  const confirmRideRef = useRef(null);
  const [ridePanel, setRidePanel] = useState(false);
  const [confirmRide, setconfirmRide] = useState(false);
  const { captain,token,setToken,captainId,setcaptainId } = useContext(CaptainDataContext);
  const [ride, setRide] = useState(null);
  const navigate = useNavigate();
  const [newRide,setnewRide] = useState(false)
  const { sendMessage, receiveMessage } = useContext(SocketContext);
  const [otp,setOtp] = useState(null)


  async function confirmride() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        {
          captainId: captainId,
          rideId: ride?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('response.data = ',response.data);
      console.log('response.data.ride.otp=',response.data.ride.otp);
      console.log('response.data.ride.otp type=',typeof(response.data.ride.otp));
      // localStorage.setItem('otp', response.data.ride.otp);
      setOtp(response.data.ride.otp);
      return response.data;

    } catch (error) {
      console.error(
        "Error confirming ride:",
        error.response?.data || error.message
      );
      return null; // Ensure function returns something even on failure
    }
  }

  useEffect(() => {
    socket.on("new-ride", (data) => {
      console.log(data);
      setRide(data);
      setnewRide(true)
      setRidePanel(true);
    });
  }, []);

  useEffect(() => {
    if (!captain.fullname || !captain.fullname.firstname) {
      navigate("/captainLogin");
    }

    sendMessage("join", {
      userType: "captain",
      userId: captainId,
    });
    receiveMessage("new-ride", (data) => {
      console.log(data);
      setRide(data);
      setnewRide(true)
      setRidePanel(true);
    });



    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          const userId =captainId;

          sendMessage("update-location-captain", { userId, lat, long });
        });
      }
    };

    updateLocation();
    const interval = setInterval(updateLocation, 10000);
    return () => clearInterval(interval);
  }, [captain, navigate, sendMessage, receiveMessage, ride, ridePanel, captainId]);

  useEffect(() => {
    // Initial GSAP setup
    gsap.set(ridePanelRef.current, { height: "100%", translateY: "100%" });
    gsap.set(confirmRideRef.current, { autoAlpha: 0, translateY: "100%" });
  }, [captain]);

  useEffect(() => {
    // Ride panel animation
    if (ridePanel) {
      gsap.to(ridePanelRef.current, {
        height: "100%",
        translateY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(ridePanelRef.current, {
        height: "0%",
        translateY: "100%",
        duration: 0.5,
        ease: "power2.out",
      });
    }

    // Confirm ride animation
    if (confirmRide) {
      gsap.to(confirmRideRef.current, {
        autoAlpha: 1, // Makes it visible
        translateY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(confirmRideRef.current, {
        autoAlpha: 0, // Fades out and hides
        translateY: "100%",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [ridePanel, confirmRide]);
  const handleLogout = ()=>{
    localStorage.clear();
    window.location.reload();
    navigate('/captainLogin')


  }
  function clearStorage(){
    window.location.reload()
  
    

    navigate('/captainLogin')
  
  
  }
  useEffect(()=>{
    setTimeout(()=>{
      clearStorage()
    },2 * 60 * 60 * 1000)
    
  })
  return (
    <div className="relative w-screen h-screen overflow-hidden">
       <span className="flex gap-3 absolute top-2 right-2 z-50 p-1 bg-white rounded-md text-black font-bold  shadow-lg ">
      <i className="ri-user-6-line"></i>
        <button onClick={ handleLogout}>Logout</button>
      </span>
      {/* Logo */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
        className="absolute top-5 left-5 w-20"
      />

      {/* Background */}
      <LiveTracking/>


      {/* Captain Details */}
      <div className="absolute bottom-0 w-full p-2 bg-white">
        <CaptainDetails setRidePanel={setRidePanel} captain={captain} newRide={newRide} />
      </div>

      {/* Ride Panel */}
      <div
        ref={ridePanelRef}
        className="w-full justify-center items-center gap-6 absolute bottom-0 p-2 bg-white"
      >
        <RidePopUp
          setRidePanel={setRidePanel}
          ridePanel={ridePanel}
          setconfirmRide={setconfirmRide}
          ride={ride}
          confirmRide={confirmRide}
          confirmRideRef={confirmRideRef}
          setRide={setRide}
          confirmride={confirmride}
        />
      </div>

      {/* Confirm Ride Panel */}

      <div
        ref={confirmRideRef}
        className="w-full h-full absolute bottom-0 bg-white flex-col p-4 justify-center items-center gap-4 overflow-scroll"
      >
        <StartRide
          confirmRide={confirmRide}
          setconfirmRide={setconfirmRide}
          confirmRideRef={confirmRideRef}
          ridePanel={ridePanel}
          setRidePanel={setRidePanel}
          ride={ride}
          setRide={setRide}
          confirmride={confirmride}
          otp={otp}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
