const mongoose = require('mongoose');

// Define the Provider Schema
const providerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        set: v => v ? v.toUpperCase() : v // Convert to uppercase only if value exists
    },
    address: { 
        Address: {
            type: String,
            set: v => v ? v.toUpperCase() : v // Convert to uppercase only if value exists
        },
        City: {
            type: String,
            set: v => v ? v.toUpperCase() : v // Convert to uppercase only if value exists
        },
        State: {
            type: String,
            set: v => v ? v.toUpperCase() : v // Convert to uppercase only if value exists
        },
        Zip: {
            type: String,
        }
    }, 
    phone: {
        type: String
    },
    fax: {
        type: String
    },
    npi: {  // National Provider Identifier
        type: String,
        required: true,
        set: v => v ? v.toUpperCase() : v, // Convert to uppercase only if value exists
        validate: {
            validator: function(v) {
                return /^[0-9]{10}$/.test(v); // Ensure the NPI is exactly 10 digits
            },
            message: props => `${props.value} is not a valid NPI. It must contain exactly 10 digits.`
        }
    },
    ptan: {  // Provider Transaction Access Number
        type: String,
        required: true,
        set: v => v ? v.toUpperCase() : v // Convert to uppercase only if value exists
    },
    taxId: {
        type: String,
        required: true,
        set: v => v ? v.toUpperCase() : v // Convert to uppercase only if value exists
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});


module.exports = mongoose.model('Provider', providerSchema);