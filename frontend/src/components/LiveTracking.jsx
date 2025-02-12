import {
    useJsApiLoader,
    GoogleMap,
    Marker,
  } from "@react-google-maps/api";
  import { useState, useEffect } from "react";
  
  function LiveTracking() {
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });
  
    const [userLocation, setUserLocation] = useState(null);
  
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => console.error("Error getting location:", error),
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
      }
    }, []);
  
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="relative h-screen w-screen">
        <GoogleMap
          center={userLocation || { lat: 48.8584, lng: 2.2945 }} // Defaults to Eiffel Tower if location is unavailable
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "60%" }}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {userLocation && <Marker position={userLocation} />}
        </GoogleMap>
      </div>
    );
  }
  
  export default LiveTracking;
  