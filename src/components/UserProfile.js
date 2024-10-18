// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ userId }) => {
  const [profile, setProfile] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    profilePicture: '',
    phone: '', 
  });
  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode

/*  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get(`/profiles/${userId}`);
      setProfile(response.data);
      setFormData(response.data);
    };

    fetchProfile();
  }, [userId]);*/

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token'); // Get token from local storage
      const response = await axios.get('/api/profiles/me', {
        headers: { Authorization: token }, // Set Authorization header
      });
      setProfile(response.data);
      setFormData(response.data);
    };

    fetchProfile();
  }, []);
  


  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Save selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('profilePicture', file);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('bio', formData.bio);
    formDataToSend.append('phone', formData.phone);

    // Send a POST request to update the user profile
    try {
      const response = await axios.post(`/api/profiles/upload/${userId}`, formDataToSend);
      setProfile(response.data); // Update profile data with the response
      setIsEditing(false); // Exit edit mode after saving
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Phone"
          />
          <textarea
            name="bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="Bio"
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <img src={profile.profilePicture} alt="Profile" />
          <h2>{profile.name}</h2>
          <p>{profile.email}</p>
          <p>{profile.bio}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;


