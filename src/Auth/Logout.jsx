import React from 'react'
import { useAuth } from './AuthContext'
import { useNavigate } from 'react-router-dom';
import "./Logout.css"

function Logout() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

  return (
    <button className='logout-button' onClick={handleLogout}>Logout</button>
  )
}

export default Logout