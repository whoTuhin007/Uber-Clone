import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { captain, setcaptain, isloading, setisloading,token,setToken } = useContext(CaptainDataContext);

  useEffect(() => {
    if (!token) {
      setToken(null)
      navigate('/captainLogin');
      
      
      } 
      
  
  },[navigate,token,setToken]);

  return captain ? children : navigate('/captainLogin')
};


export default CaptainProtectWrapper;
