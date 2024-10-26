//Dependencies and modules
const bcrypt = require("bcrypt");

const Patient = require("../models/Patient");
const Payer = require("../models/Payer");
const Provider = require("../models/Provider");
const Notice = require("../models/Notice");


const auth = require("../middleware/auth");
const { authMiddleware, verify, verifyAdmin, isLoggedIn, errorHandler} = auth;

const mongoose = require('mongoose');  // Import mongoose

// export date validation from utils/dateValidation.js
const validation = require("../utils/validation");

const { validateDate } = validation;


// Controller to add a Notice
/*module.exports.addNoticeOfElection = async (req, res) => {
    const {
        patientId,
        placeOfService,
        payerId,
        memberId,
        admitDate,
        benefitPeriod,
        primaryDiagnosis,
        AttMd
        } = req.body; // Get the data from the request body

    try {
        // Validate patientId
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).send({
                message: 'Patient not found.'
            });
        }

        // Validate payerId
        const payer = await Payer.findById(payerId);
        if (!payer) {
            return res.status(404).send({
                message: 'Payer not found.'
            });
        }

        // Validate admitDate using validateDate function
        const admitDateValidation = validateDate(admitDate);
        if (!admitDateValidation.isValid) {
            return res.status(400).send({
                message: admitDateValidation.message
            });
        }

        // Validate benefitPeriod dates
        const parsedBenefitPeriod = await Promise.all(benefitPeriod.map(async (b) => {
            const startDateValidation = validateDate(b.BeneStartDate);
            const termDateValidation = validateDate(b.BeneTermDate);
            if (!startDateValidation.isValid) {
                throw new Error(startDateValidation.message);
            }
            if (!termDateValidation.isValid) {
                throw new Error(termDateValidation.message);
            }

            return {
                benefitNum: b.benefitNum,
                BeneStartDate: startDateValidation.parsedDate,
                BeneTermDate: termDateValidation.parsedDate
            };
        }));

        // Create a new Notice instance
        const newNotice = new Notice({
            patientId,
            placeOfService,
            payerId,
            memberId,
            admitDate: admitDateValidation.parsedDate,
            benefitPeriod: parsedBenefitPeriod,
            primaryDiagnosis,
            AttMd
        });

        // Save the Notice to the database
        const savedNotice = await newNotice.save();

        // Send success response
        res.status(201).send({
            message: 'Notice added successfully.',
            notice: savedNotice
        });
    } catch (error) {
        // Catch any errors and return a 500 status with the error message
        res.status(500).send({
            message: 'Error adding Notice',
            error: error.message
        });
    }
};*/

//v2: to autocalculate BeneTermDate.
module.exports.addNoticeOfElection = async (req, res) => {
    const {
        patientId,
        placeOfService,
        payerId,
        memberId,
        admitDate,
        typeOfBill,
        benefitPeriod,
        primaryDiagnosis,
        AttMd
    } = req.body; // Get the data from the request body

    try {
        // Validate patientId
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).send({
                message: 'Patient not found.'
            });
        }

        // Validate payerId
        const payer = await Payer.findById(payerId);
        if (!payer) {
            return res.status(404).send({
                message: 'Payer not found.'
            });
        }

        // Validate admitDate using validateDate function
        const admitDateValidation = validateDate(admitDate);
        if (!admitDateValidation.isValid) {
            return res.status(400).send({
                message: admitDateValidation.message
            });
        }

        // Validate benefitPeriod dates and calculate BeneTermDate
        const parsedBenefitPeriod = await Promise.all(benefitPeriod.map(async (b) => {
            // Validate BeneStartDate
            const startDateValidation = validateDate(b.BeneStartDate);
            if (!startDateValidation.isValid) {
                throw new Error(startDateValidation.message);
            }

            // Parse BeneStartDate
            const startDateParts = startDateValidation.parsedDate.split('/').map(num => parseInt(num, 10));
            const BeneStartDate = new Date(Date.UTC(startDateParts[2], startDateParts[0] - 1, startDateParts[1]));

            // Calculate BeneTermDate based on benefitNum
            let BeneTermDate;
            if (b.benefitNum === 1 || b.benefitNum === 2) {
                // +89 days for benefitNum 1 or 2
                BeneTermDate = new Date(BeneStartDate);
                BeneTermDate.setUTCDate(BeneStartDate.getUTCDate() + 89);
            } else if (b.benefitNum > 2) {
                // +59 days for benefitNum greater than 2
                BeneTermDate = new Date(BeneStartDate);
                BeneTermDate.setUTCDate(BeneStartDate.getUTCDate() + 59);
            }

            // Format BeneTermDate to MM-DD-YYYY
            const formattedBeneTermDate = `${String(BeneTermDate.getUTCMonth() + 1).padStart(2, '0')}-${String(BeneTermDate.getUTCDate()).padStart(2, '0')}-${BeneTermDate.getUTCFullYear()}`;

            return {
                benefitNum: b.benefitNum,
                BeneStartDate: startDateValidation.parsedDate,
                BeneTermDate: formattedBeneTermDate // Use the calculated date
            };
        }));

        // Create a new Notice instance
        const newNotice = new Notice({
            patientId,
            placeOfService,
            payerId,
            memberId,
            admitDate: admitDateValidation.parsedDate,
            typeOfBill,
            benefitPeriod: parsedBenefitPeriod,
            primaryDiagnosis,
            AttMd
        });

        // Save the Notice to the database
        const savedNotice = await newNotice.save();

        // Send success response
        res.status(201).send({
            message: 'Notice added successfully.',
            notice: savedNotice
        });
    } catch (error) {
        // Catch any errors and return a 500 status with the error message
        res.status(500).send({
            message: 'Error adding Notice',
            error: error.message
        });
    }
};

// Controller to retrieve all patients by ProviderID

module.exports.getAllNoticesByProviderId = async (req, res) => {

    const { providerId } = req.params; // Get provider ID from request parameters

    try {
        const notices = await Notice.find({ providerId: providerId }); 
        // Find notices by provider ID

        if (notices.length === 0) {
            return res.status(404).send({
                message: 'No NOE found for this provider.'
            });
        }

        res.status(200).send(notices); // Send the list of noe as response
    } catch (error) {
        res.status(500).send({
            message: 'Error retrieving NOE',
            error: error.message
        });
    }

};


// Controller to retrieve all Notices of Election
module.exports.getAllNoticesOfElection = async (req, res) => {
    try {
        const notices = await Notice.find(); // Retrieve all Notices of Election
        res.status(200).send(notices); // Send the notices as a response
    } catch (error) {
        res.status(500).send({
            message: 'Error retrieving Notices of Election',
            error: error.message
        });
    }
};

// Controller to retrieve a single Notice of Election by ID
module.exports.getNoticeOfElectionById = async (req, res) => {
    const { id } = req.params; // Get Notice ID from request parameters

    try {
        const notice = await Notice.findById(id); // Find the Notice of Election by ID

        if (!notice) {
            return res.status(404).send({
                message: 'Notice of Election not found.'
            });
        }

        res.status(200).send(notice); // Send the notice as a response
    } catch (error) {
        res.status(500).send({
            message: 'Error retrieving Notice of Election',
            error: error.message
        });
    }
};

// Controller to update a Notice of Election by ID
module.exports.updateNoticeOfElection = async (req, res) => {
    const { id } = req.params; // Get Notice ID from request parameters
    const updates = req.body; // Get the updates from the request body

    try {
        const updatedNotice = await Notice.findByIdAndUpdate(id, updates, {
            new: true, // Return the updated document
            runValidators: true // Validate the update against the schema
        });

        if (!updatedNotice) {
            return res.status(404).send({
                message: 'Notice of Election not found.'
            });
        }

        res.status(200).send({
            message: 'Notice of Election updated successfully.',
            notice: updatedNotice
        });
    } catch (error) {
        res.status(500).send({
            message: 'Error updating Notice of Election',
            error: error.message
        });
    }
};

// Controller to delete a Notice of Election by ID
module.exports.deleteNoticeOfElection = async (req, res) => {
    const { id } = req.params; // Get Notice ID from request parameters

    try {
        const deletedNotice = await Notice.findByIdAndDelete(id); // Find and delete the Notice of Election

        if (!deletedNotice) {
            return res.status(404).send({
                message: 'Notice of Election not found.'
            });
        }

        res.status(200).send({
            message: 'Notice of Election deleted successfully.',
            notice: deletedNotice // Optionally return the deleted notice data
        });
    } catch (error) {
        res.status(500).send({
            message: 'Error deleting Notice of Election',
            error: error.message
        });
    }
};