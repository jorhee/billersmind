//user routes
//[dependencies and modules]
const express = require("express");


const patientController = require("../controllers/patient");

const auth = require("../middleware/auth");
const { authMiddleware, verify, verifyAdmin, isLoggedIn, errorHandler} = auth;

//[routing component]
const router = express.Router();



// Add Patient -
router.post('/', verify, verifyAdmin, patientController.addPatient);

// Route to retrieve all patients
router.get('/all', verify, verifyAdmin, patientController.getAllPatients);

// Route to retrieve a patient by ID
router.get('/:id', verify, verifyAdmin, patientController.getPatientById);

// Route to update a patient by ID
router.put('/:id', verify, verifyAdmin, patientController.updatePatient);

// Route to delete a patient by ID
router.delete('/delete/:id', verify, verifyAdmin, patientController.deletePatient);








//[export route system]
module.exports = router;