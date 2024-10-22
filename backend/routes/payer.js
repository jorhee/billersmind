//payer routes
//[dependencies and modules]
const express = require("express");

const payerController = require("../controllers/payer");

const auth = require("../auth");
const { verify, verifyAdmin, isLoggedIn } = auth;


//[routing component]
const router = express.Router();



// routes/payerRoutes.js

// Route for adding a payer
router.post('/add', verify, verifyAdmin, payerController.addPayer);

// Route to retrieve all payers
router.get('/', verify, verifyAdmin, payerController.getAllPayers);

// Route to update a payer by ID
router.put('/update/:id', verify, verifyAdmin, payerController.updatePayer);

// Route to delete a payer
router.delete('/delete/:id', verify, verifyAdmin, payerController.deletePayer);

//[export route system]
module.exports = router;