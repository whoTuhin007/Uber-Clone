import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';

const UserProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const {token}= useContext(UserDataContext);

  useEffect(()=>{

     
  if (!token) {
    navigate('/login');
  }
  }
  
   ,[ navigate,token]
  )

  return <>
  {children}
  </>;
};

export default UserProtectWrapper;