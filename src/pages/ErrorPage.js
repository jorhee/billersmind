import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import TransPageNotFound from '../components/images/TransPageNotFound.png';
import { AuthContext } from '../context/AuthContext';
import BackButton from '../components/BackButton';

export default function ErrorPage()  {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const goBackHome = () => {
    navigate('/');
  };

  return (
    <Container>
    <div style={styles.container}>
      <img src={TransPageNotFound} alt="Error" style={styles.image} />
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
      { isAuthenticated ? (
          <>
            <BackButton />
          </>
        ) : (
      <button style={styles.button} onClick={goBackHome}>
        Go Back Home
      </button>
      )}
    </div>
    </ Container>
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
    color: '#f5f5f5', // Light color for text on a dark background
    backgroundColor: '#121212', // Dark background color
  },
  image: {
    width: '500px', // Adjust size as needed
    marginBottom: '20px',
    
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


