//patient controllers
//Dependencies and modules
const bcrypt = require("bcrypt");

const User = require("../models/User");
const Patient = require("../models/Patient");
const Payer = require("../models/Payer");
const Provider = require("../models/Provider");

const auth = require("../middleware/auth");
const { authMiddleware, verify, verifyAdmin, isLoggedIn, errorHandler} = auth;
const mongoose = require('mongoose');  // Import mongoose

// export date validation from utils/dateValidation.js
const validation = require("../utils/validation");

const { validateDate } = validation;


// add Patient

//v5- using date validation as global from utils/dateValidation.js

/*
module.exports.addPatient = async (req, res) => {
    const {
        lastName,
        firstName,
        dateOfBirth,
        gender,
        address,
        payerId,
        memberId,
        providerId,
    } = req.body;

    try {
        // Normalize memberId: Remove spaces and convert to lowercase
        const normalizedMemberId = memberId.trim().toLowerCase();

        // Validate memberId for no spaces
        if (/\s/.test(memberId)) {
            return res.status(400).send({
                message: 'memberId should not contain spaces.'
            });
        }

        // Call the validateDate function to validate the date of birth
        const dateValidation = validateDate(dateOfBirth);
        if (!dateValidation.isValid) {
            return res.status(400).send({
                message: dateValidation.message
            });
        }

        // Get the validated date (as a Date object)
        const dob = dateValidation.parsedDate;

        // Check for duplicate patient based on normalized memberId and dateOfBirth
        const existingPatient = await Patient.findOne({
            memberId: normalizedMemberId,
            dateOfBirth: dob,
        });
        if (existingPatient) {
            return res.status(400).send({
                message: 'A patient with the same date of birth and memberId already exists.'
            });
        }

         // Validate the payerId by checking if it exists in the Payer database
        const payerExists = await Payer.findById(payerId);
        if (!payerExists) {
            return res.status(400).send({
                message: 'Invalid payerId. Payer not found in the database.'
            });
        }

        // Validate the payerId by checking if it exists in the Payer database
        const payerExists = await Payer.findById(payerId);
        if (!payerExists) {
            return res.status(400).send({
                message: 'Invalid payerId. Payer not found in the database.'
            });
        }




        // Create a new patient instance
        const newPatient = new Patient({
            lastName,
            firstName,
            dateOfBirth: dob, // Store as Date object
            gender,
            address,
            payerId,
            memberId: normalizedMemberId // Store the normalized memberId
        });

        // Save the patient to the database
        const savedPatient = await newPatient.save();

        // Send success response
        res.status(201).send({
            message: "Patient added successfully",
            patient: {
                lastName: savedPatient.lastName,
                firstName: savedPatient.firstName,
                payer: savedPatient.payer
            }
        });
    } catch (error) {
        // Catch any errors and return a 500 status with the error message
        res.status(500).send({
            message: 'Error adding patient',
            error: error.message
        });
    }
};
*/

//add patient v2: PayerId and ProviderID included:

module.exports.addPatient = async (req, res) => {
    const {
        lastName,
        firstName,
        dateOfBirth,
        gender,
        address,
        payerId,      // Payer ID input
        memberId,
        providerId    // Provider ID input
    } = req.body;

    try {
        // Normalize memberId: Remove spaces and convert to lowercase
        const normalizedMemberId = memberId.trim().toLowerCase();

        // Validate memberId for no spaces
        if (/\s/.test(memberId)) {
            return res.status(400).send({
                message: 'memberId should not contain spaces.'
            });
        }

        // Call the validateDate function to validate the date of birth
        const dateValidation = validateDate(dateOfBirth);
        if (!dateValidation.isValid) {
            return res.status(400).send({
                message: dateValidation.message
            });
        }

        // Get the validated date (as a Date object)
        const dob = dateValidation.parsedDate;

        // Check for duplicate patient based on normalized memberId and dateOfBirth
        const existingPatient = await Patient.findOne({
            memberId: normalizedMemberId,
            dateOfBirth: dob,
        });

        if (existingPatient) {
            return res.status(400).send({
                message: 'A patient with the same date of birth and memberId already exists.'
            });
        }

        // Validate if payerId exists in the Payer collection
        const payer = await Payer.findById(payerId);
        if (!payer) {
            return res.status(400).send({
                message: 'Invalid payerId. Payer not found in the database.'
            });
        }

        // Validate if providerId exists in the Provider collection
        const provider = await Provider.findById(providerId);
        if (!provider) {
            return res.status(400).send({
                message: 'Invalid providerId. Provider not found in the database.'
            });
        }

        // Create a new patient instance
        const newPatient = new Patient({
            lastName,
            firstName,
            dateOfBirth: dob, // Store as Date object
            gender,
            address,
            payerId, // Store the validated payerId
            memberId: normalizedMemberId, // Store the normalized memberId
            providerId // Store the validated providerId
        });

        // Save the patient to the database
        const savedPatient = await newPatient.save();

        // Send success response
        res.status(201).send({
            message: "Patient added successfully",
            patient: {
                lastName: savedPatient.lastName,
                firstName: savedPatient.firstName,
                provider: provider.name, // Send back the provider name for clarity
                payer: payer.name // Send back the payer name for clarity
            }
        });
    } catch (error) {
        // Catch any errors and return a 500 status with the error message
        res.status(500).send({
            message: 'Error adding patient',
            error: error.message
        });
    }
};

// Controller to retrieve all patients
module.exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find(); // Retrieve all patients
        res.status(200).send(patients); // Send patients as response
    } catch (error) {
        res.status(500).send({
            message: 'Error retrieving patients',
            error: error.message
        });
    }
};

// Controller to retrieve a single patient by ID
module.exports.getPatientById = async (req, res) => {
    const { id } = req.params; // Get patient ID from request parameters

    try {
        const patient = await Patient.findById(id); // Find patient by ID

        if (!patient) {
            return res.status(404).send({
                message: 'Patient not found.'
            });
        }

        res.status(200).send(patient); // Send the patient as response
    } catch (error) {
        res.status(500).send({
            message: 'Error retrieving patient',
            error: error.message
        });
    }
};

// Controller to update a patient by ID
module.exports.updatePatient = async (req, res) => {
    const { id } = req.params; // Get patient ID from request parameters
    const updates = req.body; // Get the updates from the request body

    try {
        const updatedPatient = await Patient.findByIdAndUpdate(id, updates, {
            new: true, // Return the updated document
            runValidators: true // Validate the update against the schema
        });

        if (!updatedPatient) {
            return res.status(404).send({
                message: 'Patient not found.'
            });
        }

        res.status(200).send({
            message: 'Patient updated successfully.',
            patient: updatedPatient
        });
    } catch (error) {
        res.status(500).send({
            message: 'Error updating patient',
            error: error.message
        });
    }
};

// Controller to delete a patient by ID
module.exports.deletePatient = async (req, res) => {
    const { id } = req.params; // Get patient ID from request parameters

    try {
        const deletedPatient = await Patient.findByIdAndDelete(id); // Find and delete the patient

        if (!deletedPatient) {
            return res.status(404).send({
                message: 'Patient not found.'
            });
        }

        res.status(200).send({
            message: 'Patient deleted successfully.',
            patient: deletedPatient // Optionally return the deleted patient data
        });
    } catch (error) {
        res.status(500).send({
            message: 'Error deleting patient',
            error: error.message
        });
    }
};

