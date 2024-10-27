import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

export default function BackButton({ fallbackPath = '/' }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1); // Go back to the previous page
    } else {
      navigate(fallbackPath); // Go to fallback path if there's no previous page
    }
  };

  return (
    <button
      style={{
        ...styles.backbutton,
        backgroundColor: isHovered ? '#5348c8' : '#6c63ff',
      }}
      onClick={handleBack}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <BiArrowBack style={styles.backIcon} />
      Back
    </button>
  );
}

const styles = {
  backbutton: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginRight: '10px',
    marginLeft: '10px',
  },

  backIcon: {
    marginRight: '8px',
    fontSize: '20px',
  },
};
