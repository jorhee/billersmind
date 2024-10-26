//[dependencies and modules]
const express = require("express");


const noticeController = require("../controllers/notice");

const auth = require("../middleware/auth");
const { authMiddleware, verify, verifyAdmin, isLoggedIn, errorHandler} = auth;

//[routing component]
const router = express.Router();


// Route to add a Notice of Election
router.post('/:providerId/add-notice', verify, isLoggedIn, noticeController.addNoticeOfElection);

//Get all Patients per ProviderID
router.get('/:providerId/all', verify, isLoggedIn, noticeController.getAllNoticesByProviderId);

// Route to retrieve all Notices of Election
router.get('/all', verify, isLoggedIn, noticeController.getAllNoticesOfElection);

// Route to retrieve a Notice of Election by ID
router.get('/:id', verify, isLoggedIn, noticeController.getNoticeOfElectionById);

// Route to update a Notice of Election by ID
router.put('/update/:id', verify, isLoggedIn, noticeController.updateNoticeOfElection);

// Route to delete a Notice of Election by ID
router.delete('/delete/:id', verify, isLoggedIn, noticeController.deleteNoticeOfElection);



//[export route system]
module.exports = router;