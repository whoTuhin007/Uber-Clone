import React from 'react'

const LocationSuggestions = ({ suggestions, showPanel, setcarSelectPanel, activeField,setActiveField,setPickup,setDestination }) => {
  return (
    <div className='w-full h-full overflow-scroll'>
      {suggestions.map((suggestion, index) => (
        <div 
          key={index} 
          className={`location-suggestion w-full  rounded-lg active:border-black border-gray-100 border-2 text-base px-4 py-4 font-bold ${ showPanel ? '' : 'hidden'}`} 
          onClick={() => 
            {
              if(activeField === 'pickup'){
                setPickup(suggestion)
                
                }
                else if( activeField === 'destination'){
                  setDestination(suggestion)
                } 
                setActiveField('')

              }
              

            } // Fix here: Wrapping in a function
        >
          <i className="ri-map-pin-2-line mr-4"></i>
          <span
          >{suggestion}</span>
        </div>
      ))}
    </div>
  )
}

export default LocationSuggestions
