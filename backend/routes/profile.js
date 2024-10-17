// routes/profile.js
const express = require('express');
const UserProfile = require('../models/UserProfile');
const router = express.Router();
const authMiddleware = require('../middleware/auth'); // Assume you have an auth middleware
const multer = require('multer');
const path = require('path');

// Get user profile
router.get('/:userId', authMiddleware, async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).send('Profile not found');
    res.json(profile);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Create or update user profile
router.post('/', authMiddleware, async (req, res) => {
  const { name, email, bio, profilePicture } = req.body;

  try {
    let profile = await UserProfile.findOne({ userId: req.user.id });
    if (profile) {
      // Update existing profile
      profile.name = name;
      profile.email = email;
      profile.bio = bio;
      profile.profilePicture = profilePicture;
      await profile.save();
      return res.json(profile);
    }

    // Create new profile
    profile = new UserProfile({
      userId: req.user.id,
      name,
      email,
      bio,
      profilePicture,
    });
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Delete user profile
router.delete('/:userId', authMiddleware, async (req, res) => {
  try {
    await UserProfile.deleteOne({ userId: req.params.userId });
    res.send('Profile deleted');
  } catch (error) {
    res.status(500).send('Server error');
  }
});



// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files to 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Rename file to avoid conflicts
  },
});

const upload = multer({ storage });

// Add route for uploading profile pictures
router.post('/upload/:userId', authMiddleware, upload.single('profilePicture'), async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).send('Profile not found');

    // Update profile picture
    profile.profilePicture = `/${req.file.path}`; // Save path to profile picture
    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).send('Server error');
  }
});







module.exports = router;
