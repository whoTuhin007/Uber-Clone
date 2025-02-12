



import React from 'react'

const LocationInput = ({
    pickup,
    setPickup,
    destination,
    setDestination,
    handleSubmit,
    setcarSelectPanel,
    setShowPanel,
    handlePickupChange,
    handleDestinationChange,
    setActiveField,
 }) => {
  return (
    
    <form
    className="flex flex-col gap-4 mt-4"
    onSubmit={(e) => {
      handleSubmit(e);
   
    }}
  >
    <input
      type="text"
      value={pickup}
      onClick={() => {
        setActiveField("pickup")
        
        setShowPanel(true);
      }}
      onChange={(e) => {
        handlePickupChange(e);
      }}
      placeholder="Pickup Location"
      className="bg-[#eeee] px-8 w-3/4 m-auto placeholder:text-base rounded-lg p-2 "
    />
    <input
      value={destination}
      onClick={() => {
        setShowPanel(true);
        setActiveField("destination");
      }}
      onChange={(e) => {
        handleDestinationChange(e);
      }}
      type="text"
      placeholder="Destination"
      className="bg-[#eeee] px-8 w-3/4 m-auto placeholder:text-base rounded-lg p-2"
    />
    <button
    onClick={()=>{
      setcarSelectPanel(true)
    }}
      type="submit"
      className="mt-2 bg-black text-white  text-lg  w-3/4 rounded-lg px-8 m-auto py-2"
    >
      Search Rides <i className="ri-e-bike-line text-xl"></i>
    </button>
  </form>
  )
}

export default LocationInput