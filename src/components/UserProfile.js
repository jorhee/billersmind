// src/components/UserProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = ({ userId }) => {
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    profilePicture: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get(`/api/profiles/${userId}`);
      setProfile(response.data);
      setFormData(response.data); // Set form data for editing
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`/api/profiles`, formData);
    setIsEditing(false);
    setProfile(formData); // Update profile data
  };

  return (
    <div>
      <h1>User Profile</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Bio"
          />
          <input
            type="text"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleChange}
            placeholder="Profile Picture URL"
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <div>
          <h2>{profile.name}</h2>
          <p>{profile.email}</p>
          <p>{profile.bio}</p>
          {profile.profilePicture && <img src={profile.profilePicture} alt="Profile" />}
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};



















export default UserProfile;

