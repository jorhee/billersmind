
//Patient Model

const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({

    lastName: {
        type: String,
        required: [true, 'lastName is required'],
        set: v => v ? v.toUpperCase() : v // Convert to uppercase if the value exists
    },
    firstName: {
        type: String,
        required: [true, 'firstName is required'],
        set: v => v ? v.toUpperCase() : v // Convert to uppercase if the value exists
    },
    dateOfBirth: {
        type: String,
        required: [true, 'Dob is required']
    },
    gender: {
        type: String,
        enum: ['M', 'F', 'U'],  // M = Male, F = Female, U = Unknown
        required: [true, 'Gender is required']
    },
    address: {
        Address: {
            type: String,
            set: v => v ? v.toUpperCase() : v // Convert to uppercase if the value exists
        },
        City: {
            type: String,
            set: v => v ? v.toUpperCase() : v // Convert to uppercase if the value exists
        },
        State: {
            type: String,
            set: v => v ? v.toUpperCase() : v // Convert to uppercase if the value exists
        },
        Zip: {
            type: String,
            set: v => v ? v.toUpperCase() : v // Convert to uppercase if the value exists
        }
    },
    cbsaCode: {
        type: String,
        required: false,
    },
    dateOfDeath: {
        type: Date,
        required: false
    },
    payerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payer', // Reference to Payer model
        required: true
    },
    memberId: {
        type: String,
        required: true,
        set: v => v ? v.toUpperCase() : v // Convert to uppercase if the value exists
    },
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider', // Reference to Provider model
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Patient', patientSchema);
