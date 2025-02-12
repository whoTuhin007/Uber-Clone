import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CaptainContext, { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogout = () => {
  const navigate = useNavigate();
  const {token,setToken} = useContext(CaptainDataContext)


  const logoutHandler = async () => {
    if (!token) {
      setToken(null)
      navigate('/captainLogin');
      return;
    }

    try {
      // Send logout request
      await axios.get(`${import.meta.env.VITE_BASE_URL}/captain/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Clear token and navigate
      setToken(null)
      navigate('/captainLogin');
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div>
      <button
        onClick={logoutHandler}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default CaptainLogout;
