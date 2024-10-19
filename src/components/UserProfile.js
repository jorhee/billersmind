// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';


const UserProfile = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    userPicture: '', // Ensure this exists
  });
  const [file, setFile] = useState(null); // For profile picture upload
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Get JWT token from localStorage

        const response = await axios.get('/profiles/me', {
          headers: { Authorization: `Bearer ${token}` }, // Attach token to headers
        });
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
            type="text"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            placeholder="Last Name"
            required
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
          <img src={user.userPicture || 'default-profile.png'} alt="Profile" />

          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;