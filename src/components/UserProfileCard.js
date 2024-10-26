// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa'; // Importing the user icon
import '../css/UserProfile.css';
import { useNavigate } from 'react-router-dom';


/*

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
*/

export default function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    mobileNo: '',
    email: '',
    profilePicture: null, // Holds the profile picture
  });

  // Fetch user profile from the database
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from local storage
        const response = await fetch('http://localhost:4000/profiles/me', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Include token in headers
          },
        });

        if (response.status === 401) {
          alert("Unauthorized: Please log in.");
          navigate('/login');
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched User Profile:', data); // Debugging log
        setUser(data); // Update state with fetched user data
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [navigate]); // Run once when component loads


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
          <Button 
            variant="primary" 
            className="text-center mx-1" 
            onClick={() => navigate('/add-provider')}>
            Add Provider
          </Button>
          <Button 
            variant="primary" 
            className="text-center mx-1" 
            onClick={() => navigate('/register')}>
              Add User
          </Button>
          <Button 
            variant="primary" 
            className="text-center mx-1" 
            onClick={() => navigate('/payers/all')}>
              Payer List
          </Button>
        </Card.Footer>
      </Card>
        </Container>
    </div>
    </>
  );
}