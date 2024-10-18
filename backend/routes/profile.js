// routes/profile.js
const express = require('express');

const profileController = require("../controllers/profile");
const auth = require("../middleware/auth");
const { verify, verifyAdmin, isLoggedIn, errorHandler} = auth;


const router = express.Router();

const multer = require('multer');
const path = require('path');

// Register user profile
router.post('/', profileController.registerUser);

//Login user
router.post("/login", profileController.loginUser);

// Get user profile
router.get('/details', verify, isLoggedIn, profileController.getUserProfile);

//Set user as admin

router.patch('/:id/set-as-admin', verify, verifyAdmin, isLoggedIn,profileController.updateUserAdminStatus);

//update password
router.patch('/update-password', verify, isLoggedIn, profileController.updatePassword);    

// Delete user profile
router.delete('/:userId', verify, verifyAdmin, profileController.deleteProfile);


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
router.post('/upload/:userId', verify, upload.single('profilePicture'), async (req, res) => {
  try {
    const profile = await User.findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).send('Profile not found');

    // Update profile picture
    profile.profilePicture = `/${req.file.path}`; // Save path to profile picture
    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).send('Server error');
  }
});


// Add this route to get the current user's profile
router.get('/me', verify, async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});





module.exports = router;
