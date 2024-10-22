//provider routes
//[dependencies and modules]
const express = require("express");

const providerController = require("../controllers/provider");

const auth = require("../auth");
const { verify, verifyAdmin, isLoggedIn } = auth;


//[routing component]
const router = express.Router();


// Route for adding a provider
router.post('/add', verify, verifyAdmin, providerController.addProvider);

// Route for updating a provider by ID
router.patch('/update/:id', verify, verifyAdmin, providerController.updateProvider);

// Route for retrieving all providers
router.get('/all', verify, verifyAdmin, providerController.getAllProviders);

// Route to delete a provider by ID
router.delete('/delete/:id', verify, verifyAdmin, providerController.deleteProvider);












//[export route system]
module.exports = router;