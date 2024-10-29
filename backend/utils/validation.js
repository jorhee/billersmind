// utils/validation.js
const dayjs = require('dayjs');

//v1.
/*
module.exports.validateDate = (date) => {
    const [month, day, year] = date.split('/').map(num => parseInt(num));

    // Validate month range (1-12)
    if (month < 1 || month > 12) {
        return { isValid: false, message: 'Invalid month in date. Month should be between 01 and 12.' };
    }

    // Validate day based on the month
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Check for leap year and adjust February days
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    if (month === 2 && isLeapYear) {
        daysInMonth[1] = 29; // February has 29 days in a leap year
    }

    // Validate day range based on the month
    if (day < 1 || day > daysInMonth[month - 1]) {
        return { isValid: false, message: `Invalid day in date. Day should be between 01 and ${daysInMonth[month - 1]} for the given month.` };
    }

    // Convert MM/DD/YYYY to Date object in UTC
    const parsedDate = new Date(Date.UTC(year, month - 1, day));

    // Check if the parsedDate is a valid date
    if (isNaN(parsedDate.getTime())) {
        return { isValid: false, message: 'Invalid date format. Expected MM/DD/YYYY.' };
    }

    // Validate that the date is not a future date
    const today = new Date();
    if (parsedDate > today) {
        return { isValid: false, message: 'The date cannot be a future date.' };
    }

    // If all checks pass, return valid
    return { isValid: true, parsedDate };
};
*/

// utils/validation.js
//v2- format output is perfect just MM/DD/YYYY.

module.exports.validateDate = (date) => {
    // Split the date by '/' for MM/DD/YYYY format
    const [month, day, year] = date.split('/').map(num => parseInt(num, 10));

    // Validate month range (1-12)
    if (month < 1 || month > 12) {
        return { isValid: false, message: 'Invalid month in date. Month should be between 01 and 12.' };
    }

    // Validate day based on the month
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Check for leap year and adjust February days
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    if (month === 2 && isLeapYear) {
        daysInMonth[1] = 29; // February has 29 days in a leap year
    }

    // Validate day range based on the month
    if (day < 1 || day > daysInMonth[month - 1]) {
        return { isValid: false, message: `Invalid day in date. Day should be between 01 and ${daysInMonth[month - 1]} for the given month.` };
    }

    // Convert MM/DD/YYYY to Date object in UTC
    const parsedDate = new Date(Date.UTC(year, month - 1, day));

    // Check if the parsedDate is a valid date
    if (isNaN(parsedDate.getTime())) {
        return { isValid: false, message: 'Invalid date format. Expected MM/DD/YYYY.' };
    }

    // Validate that the date is not a future date
    const today = new Date();
    if (parsedDate > today) {
        return { isValid: false, message: 'The date cannot be a future date.' };
    }

    // If all checks pass, return valid with the formatted date as MM/DD/YYYY
    const formattedDate = `${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}/${year}`;
    
    return { isValid: true, parsedDate: formattedDate };
};


//v2. for date format not string.



    

module.exports.dateValidator = (input) => {
    // Check if the input matches the MM/DD/YYYY format
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/;

    if (!regex.test(input)) {
        return {
            valid: false,
            message: 'Invalid date format. Please use MM/DD/YYYY.'
        };
    }

    // Parse the input date
    const parsedDate = dayjs(input, 'MM/DD/YYYY');

    // Check if the parsed date is valid
    if (!parsedDate.isValid()) {
        return {
            valid: false,
            message: 'Invalid date. Please check the day and month values.'
        };
    }

    // Return the valid date in the same format
    return {
        valid: true,
        date: parsedDate.format('MM/DD/YYYY')
    };
}
// Export the function as default



// Example usage:
/*
const result = dateValidator('02/29/2024'); // Leap year
if (result.valid) {
    console.log(`Valid date: ${result.date}`);
} else {
    console.log(result.message);
}*/