import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserLogout = () => {
    const navigate = useNavigate();
   const {token,setToken }= useContext(UserDataContext)

    const logout = () => {
        if (!token) {
            setToken(null)
            navigate('/login');
            return;
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                setToken(null)
                navigate('/login');
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default UserLogout;