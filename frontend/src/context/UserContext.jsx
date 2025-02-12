import React, { createContext, useState } from 'react'
import axios from 'axios'
export const UserDataContext = createContext()


const UserContext = ({ children }) => {
    const [usId,setusId]= useState(null)
    const [token,setToken] = useState(null)

    const [ user, setUser ] = useState({
        email: '',
        fullName: {
            firstName: '',
            lastName: ''
        }
    })

    const [fares, setfares] = useState({
        'car':'loading...',
        'auto':'loading...',
        'motorcycle':'loading...'
      
      });
    async function findTrip(pickup, destination) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
            {
              params: {
                pickup,
                destination,
              },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("fare:",response.data)
          setfares(null);
          setfares(response.data)
    
    
          return response.data;
        } catch (error) {
          console.error("Error fetching fare:", error);
        }
      }

    return (
        <div>
            <UserDataContext.Provider value={{ user, setUser, usId, setusId ,fares, setfares,findTrip, setToken,token}}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext