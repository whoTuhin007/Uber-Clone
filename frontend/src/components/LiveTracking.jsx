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
  const [error, setError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Update only if moved significantly (e.g., >10 meters)
          setUserLocation((prevLocation) => {
            if (
              !prevLocation ||
              Math.abs(prevLocation.lat - latitude) > 0.0001 ||
              Math.abs(prevLocation.lng - longitude) > 0.0001
            ) {
              return { lat: latitude, lng: longitude };
            }
            return prevLocation;
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("Location access denied. Please enable GPS.");
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );

      return () => navigator.geolocation.clearWatch(watchId); // Cleanup on unmount
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  if (!isLoaded) {
    return <div className="text-center text-lg">Loading map...</div>;
  }

  return (
    <div className="relative h-screen w-screen flex flex-col items-center">
      {error && <p className="text-red-500">{error}</p>}
      <GoogleMap
        center={userLocation || { lat: 48.8584, lng: 2.2945 }} // Default: Eiffel Tower
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
