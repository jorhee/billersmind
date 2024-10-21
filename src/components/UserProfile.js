// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Button } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa'; // Importing the user icon


//import { useNavigate } from 'react-router-dom';
//const profilecontroller =require('.../backend/controllers/profile');

/*export default function UserProfile() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
  });
  const [file, setFile] = useState(null); // For profile picture upload
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode

  useEffect(() => {
    const fetchProfile = async () => {
      
        const token = localStorage.getItem('token'); // Get JWT token from localStorage

    try {   
        const response = await axios.get('http://localhost:5000/profiles/me', {
          headers: { Authorization: `Bearer ${token}` }, // Attach token to headers
        });
        console.log('Profile', response.data)//check if the data being returned.
        setUser(response.data); // Set the profile data in state
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the selected profile picture file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) formData.append('userPicture', file); // Add the file if one was selected

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`/api/profiles/upload/${user._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Attach token to headers
        },
      });
      console.log("Profile picture uploaded:", response.data);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear JWT token from localStorage
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div>
      <h1>User Profile</h1>

      {isEditing ? (
        // Editing form
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
            required
          />
          <input
            type="text"
            value={user.mobileNo}
            onChange={(e) => setUser({ ...user, mobileNo: e.target.value })}
            placeholder="Mobile Number"
            required
          />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        // Display profile details
        <div>
          <h2>{user.firstName} {user.lastName}</h2>
          <p>Email: {user.email}</p>
          <p>Mobile No: {user.mobileNo}</p>
          

          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

*/

//version 2


export default function UserProfile() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    mobileNo: '',
    email: '',
    profilePicture: null // Add this to hold the profile picture
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token'); // Get JWT token from localStorage
      console.log('Token:', token); // Check if token exists

      if (!token) {
      console.error('No token found, user might not be logged in.');
      return; // Exit if there's no token
      }
      try {
        const response = await axios.get('http://localhost:5000/profiles/me', {
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

return (
    <Container className="mt-1">
      <Card className="text-center">
        <Card.Header>
          <h2>User Profile</h2>
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
          <Button variant="primary" disabled>
            Edit Profile
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}