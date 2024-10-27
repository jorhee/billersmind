import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';

export default function ProfileButton() {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate('/me'); // Adjust path to match your Profile Page route
  };

  return (
    <button style={styles.profileButton} onClick={goToProfile}>
      <BiUser style={styles.profileIcon} />
      Profile
    </button>
  );
}

const styles = {
  profileButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    backgroundColor: '#4CAF50', // Profile button color
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    margin: '0 10px', // Optional margin
  },
  profileIcon: {
    marginRight: '8px',
    fontSize: '20px',
  },
};
