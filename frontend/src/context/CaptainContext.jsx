import React, { createContext, useEffect, useState } from 'react'

export const CaptainDataContext = createContext()



const CaptainContext = ({ children }) => {

    const [ isloading, setisloading]= useState(false);
    const [ error, seterror ] = useState(null);
    const [captain, setcaptain] = useState(null);
    const [token,setToken] = useState(null);
    const [captainId, setcaptainId] = useState(null);

  
  
    
    

    const value = 
    {
        captain,
        setcaptain,
        isloading,
        setisloading,
        error,
        seterror,
        token,
        setToken,
        captainId,
        setcaptainId
        }

    return (
        <div>
            <CaptainDataContext.Provider value={value}>
                {children}
            </CaptainDataContext.Provider>
        </div>
    )
}
export default CaptainContext;