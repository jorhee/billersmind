import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import '../css/LogoutButton.css';

export default function LogoutButton () {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the JWT token or auth key
    navigate('/login'); // Redirect to login page
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      <BiLogOut className="logout-icon" />
      Logout
    </button>
  );
};


