import React, { useRef, useState, useEffect, useContext } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSuggestions from "../components/LocationSuggestions";
import ConfirmRide from "../components/ConfirmRide";
import CarsPanel from "../components/CarsPanel";
import LocationInput from "../components/LocationInput";
import DriverSearch from "../components/DriverSearch";
import axios from "axios";
import { SocketContext } from "../context/socketContext";
import { UserDataContext } from "../context/UserContext";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Livetracking from "../components/LiveTracking";
const socket = io(`${import.meta.env.VITE_BASE_URL}`);

const HomePage = () => {
  const panelRef = useRef(null);
  const carSelectPanelRef = useRef(null);
  const togglePanelRef = useRef(null);
  const confirmRideRef = useRef(null);
  const driverSearchRef = useRef(null);
  const navigate = useNavigate();
  const [showPanel, setShowPanel] = useState(false);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [carSelectPanel, setcarSelectPanel] = useState(false);
  const [confirmRide, setconfirmRide] = useState(false);
  const [driverSearch, setdriverSearch] = useState(false);
  const [activeField, setActiveField] = useState("");
  const [ride,setRide] = useState(null)
  const [updatedride,setupdatedride] = useState(null)
  const [started,setStarted]= useState(false)

  const [vehicle, setvehicle] = useState("");
  const { usId, setusId, fares, setfares, findTrip,token } = useContext(UserDataContext);

  const { sendMessage, receiveMessage } = useContext(SocketContext);
  const userId = localStorage.getItem("userId");


  useEffect(() => {
  
    gsap.set(panelRef.current, { height: "0%" });
    gsap.set(carSelectPanelRef.current, { translateY: "100%" });
    gsap.set(confirmRideRef.current, { scale: 0 });
    gsap.set(driverSearchRef.current, { translateY: "100%" });
    gsap.set(togglePanelRef.current, { display: "none" });
  }, []);
  // Use useEffect for triggering the animation based on showPanel state
  useEffect(() => {
    if (showPanel) {
      gsap.to(panelRef.current, {
        height: "60%",
        duration: 0.5, // Duration for smooth animation
        ease: "power2.out",
      });
      gsap.to(togglePanelRef.current, {
        display: "block",
        duration: 0,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        duration: 0.5, // Duration for smooth animation
        ease: "power2.out",
      });
      gsap.to(togglePanelRef.current, {
        display: "none",
        duration: 0,
      });
    }
    if (carSelectPanel) {
      gsap.to(carSelectPanelRef.current, {
        translateY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(carSelectPanelRef.current, {
        translateY: "100%",
        duration: 0.5,
        ease: "power2.out",
        display: "hidden",
      });
    }
    if (confirmRide) {
      gsap.to(confirmRideRef.current, {
        scale: 1,
        duration: 0.5,
        ease: "expo.out",
      });
    } else {
      gsap.to(confirmRideRef.current, {
        scale: 0,
        duration: 0,
        ease: "power2.out",
        display: "hidden",
      });
    }
    if (driverSearch) {
      gsap.to(driverSearchRef.current, {
        translateY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(driverSearchRef.current, {
        translateY: "120%",
        duration: 0.5,
        ease: "power2.out",
        display: "hidden",
      });
    }
    receiveMessage("ride-confirmed", (data) => {
      setRide(data);
      setdriverSearch(false);
      navigate('/riding', { state: { ride: data , showPage:true } });
    });
    receiveMessage("ride-started", (data) => {
      setupdatedride(data);
      setStarted(true)
  
      navigate('/riding', {state : {started:true, updatedride:data,showPage:true}})
      
     
    });
    
    sendMessage("join", {
      userType: "user",
      userId: usId,
    });
  }, [showPanel, carSelectPanel, confirmRide,usId, driverSearch,receiveMessage,sendMessage,navigate,started,setStarted,updatedride]);


  
  useEffect(() => {
    socket.on('ride-confirmed', (data) => {
      setRide(data);
      setdriverSearch(false);
    });
  }, [receiveMessage]);

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    if (pickup.length > 2) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { input: e.target.value },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
          
        );
       
        
        setSuggestions(response.data);
      } catch (error) {
        console.log(error);
      
      }
    }
  };
  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    if (destination.length > 2) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: {
              input: e.target.value,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSuggestions(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };
function clearStorage(){
  window.location.reload();
  navigate('/login')


}
useEffect(()=>{
  setTimeout(()=>{
    clearStorage()
  },2 * 60 * 60 * 1000)
  
})

  async function create() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup: pickup,
          destination: destination,
          vehicleType: vehicle,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
  const handleConfirmRide = async () => {
    const ride = await create();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fareData = await findTrip(pickup, destination);
    setfares(fareData.fare);
  };

  const handleLogout = ()=>{
    window.location.reload();

  }
  return (
    <div className="relative w-full h-screen">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
        className="absolute top-5 left-5 w-20"

      />

      {/* temp image */}
      <span className="flex gap-3 absolute top-2 right-2 z-50 p-1 bg-white rounded-md text-black font-bold  shadow-lg ">
      <i className="ri-user-6-line"></i>
        <button onClick={ handleLogout }>Logout</button>
      </span>
      
     <div className="absolute top-0">
     <Livetracking/>
     </div>

    
   
      <div className="w-full h-full  absolute top-0 flex flex-col justify-end">
        <div className="h-[40%] bg-white p-5 relative ">
          <h4 className="text-2xl font-semibold flex gap-4">
        
            Find a trip
            <i
            className="ri-arrow-down-wide-line  text-2xl text-black "
            ref={togglePanelRef}
            onClick={() => {
              setShowPanel(false);
              setcarSelectPanel(false);
            }}
          ></i></h4>

         
          <div className="w-1 h-[28%] absolute left-20 top-[30%] bg-black rounded-full  flex flex-col justify-around gap-8 overflow-x-hidden">
            <div className="w-full h-2 bg-white rounded-full "></div>
            <div className="w-full h-2 bg-white  rounded-full"></div>
          </div>
          {/* form Component */}
          <LocationInput
            pickup={pickup}
            setPickup={setPickup}
            destination={destination}
            setDestination={setDestination}
            handleSubmit={handleSubmit}
            setcarSelectPanel={setcarSelectPanel}
            setShowPanel={setShowPanel}
            handleDestinationChange={handleDestinationChange}
            handlePickupChange={handlePickupChange}
            setActiveField={setActiveField}
          />
        </div>
        <div
          ref={panelRef}
          className="h-[0%] w-full flex flex-col justify-center items-center gap-3 bg-white p-2"
        >
          {/* Panel content here */}
          <LocationSuggestions
            suggestions={suggestions}
            showPanel={showPanel}
            setSuggestions={setSuggestions}
            carSelectPanel={carSelectPanel}
            setcarSelectPanel={setcarSelectPanel}
            pickup={pickup}
            setPickup={setPickup}
            destination={destination}
            setDestination={setDestination}
            activeField={activeField}
            setActiveField={setActiveField}
          />
        </div>
      </div>
      <div
        className=" text-center fixed bottom-0  bg-white overflow-scroll   overflow-x-hidden "
        ref={carSelectPanelRef}
      >
        <CarsPanel
          setcarSelectPanel={setcarSelectPanel}
          setconfirmRide={setconfirmRide}
          setShowPanel={setShowPanel}

          // fares={fares}
          // setfares={setfares}
          vehicle={vehicle}
          setvehicle={setvehicle}
        />
        <div
          ref={confirmRideRef}
          className="fixed bottom-0 translate-y-100% p-1 w-full bg-gray-950 h-[100vh] bg-opacity-40 justify-center items-center flex   overflow-scroll  overflow-x-hidden"
        >
          <ConfirmRide
            pickup={pickup}
            setPickup={setPickup}
            destination={destination}
            setDestination={setDestination}
            // fares={fares}
            // setfares={setfares}
            confirmRideRef={confirmRideRef}
            setconfirmRide={setconfirmRide}
            setdriverSearch={setdriverSearch}
            setShowPanel={setShowPanel}
            setcarSelectPanel={setcarSelectPanel}
            vehicle={vehicle}
            setvehicle={setvehicle}
            handleConfirmRide={handleConfirmRide}
          />
        </div>
      </div>
      <div
        ref={driverSearchRef}
        className="fixed bottom-0 translate-y-120% p-1 w-full bg-gray-950 h-[100vh] bg-opacity-40 justify-center items-center flex   overflow-x-hidden "
      >
        <DriverSearch
          // fares={fares}
          // setfares={setfares}
          pickup={pickup}
          setPickup={setPickup}
          destination={destination}
          setDestination={setDestination}
          vehicle={vehicle}
          setvehicle={setvehicle}
          setdriverSearch={setdriverSearch}
          setShowPanel={setShowPanel}
          setcarSelectPanel={setcarSelectPanel}
          setconfirmRide={setconfirmRide}
          ride={ride}
        />
      </div>
    </div>
  );
};

export default HomePage;
