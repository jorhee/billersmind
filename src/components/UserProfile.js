// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Button, Navbar, Nav } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa'; // Importing the user icon
import './UserProfile.css';

import { useNavigate } from 'react-router-dom';




export default function UserProfile() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    mobileNo: '',
    email: '',
    profilePicture: null // Add this to hold the profile picture
  });


  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token'); // Get JWT token from localStorage
      console.log('Token:', token); // Check if token exists

      if (!token) {
      console.error('No token found, user might not be logged in.');
      return; // Exit if there's no token
      }
      try {
        const response = await axios.get('http://localhost:4000/profiles/me', {
          headers: { Authorization: `Bearer ${token}` }, // Attach token to headers
        });
        setUser(response.data); // Set the profile data in state
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);



  const handleAddUser = () => {
    navigate('/register'); 
  };



return (
  <>
    <div className="UserProfile">
    
      <div className="pt-5">
       
     
      </div>

    <Container fluid className="mt-5">
      <Card className="text-center">
        <Card.Header>
          <h2>Welcome to Billers Mind</h2>
        </Card.Header>
        <Card.Body>
          {/* Displaying the profile picture or the default icon */}
          {user.profilePicture ? (
            <Card.Img
              variant="top"
              src={user.profilePicture}
              className="img-fluid rounded-circle mb-3"
              style={{ width: '150px', height: '150px' }}
              alt="Profile"
            />
          ) : (
            <FaUserCircle className="mb-3" style={{ fontSize: '150px', color: '#ccc' }} />
          )}
          <Card.Title>{user.firstName} {user.lastName}</Card.Title>
          <Card.Text>Email: {user.email}</Card.Text>
          <Card.Text>Mobile No: {user.mobileNo}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button variant="primary" onClick={handleAddUser}>
              Add User
          </Button>
        </Card.Footer>
      </Card>
    
    
    
      
        </Container>
    </div>
    </>
  );
}