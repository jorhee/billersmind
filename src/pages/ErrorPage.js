import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage()  {
  const navigate = useNavigate();

  const goBackHome = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
      <button style={styles.button} onClick={goBackHome}>
        Go Back Home
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    color: '#333',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: '5rem',
    marginBottom: '0.5rem',
  },
  message: {
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
  },
  button: {
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};


