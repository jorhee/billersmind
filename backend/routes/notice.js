//[dependencies and modules]
const express = require("express");


const noticeController = require("../controllers/notice");

const auth = require("../auth");
const { verify, verifyAdmin, isLoggedIn } = auth;

//[routing component]
const router = express.Router();


// Route to add a Notice of Election
router.post('/', verify, verifyAdmin, noticeController.addNoticeOfElection);

// Route to retrieve all Notices of Election
router.get('/all', verify, verifyAdmin, noticeController.getAllNoticesOfElection);

// Route to retrieve a Notice of Election by ID
router.get('/:id', verify, verifyAdmin, noticeController.getNoticeOfElectionById);

// Route to update a Notice of Election by ID
router.put('/update/:id', verify, verifyAdmin, noticeController.updateNoticeOfElection);

// Route to delete a Notice of Election by ID
router.delete('/delete/:id', verify, verifyAdmin, noticeController.deleteNoticeOfElection);



//[export route system]
module.exports = router;