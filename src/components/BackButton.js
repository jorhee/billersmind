import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import '../css/BackButton.css'; // Import CSS file for additional styling



export default function BackButton({ fallbackPath = '/' }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1); // Go back to the previous page
    } else {
      navigate(fallbackPath); // Go to fallback path if there's no previous page
    }
  };

  return (
    <button className="back-button" onClick={handleBack}>
      <BiArrowBack className="back-icon" />
      Back
    </button>
  );
};


