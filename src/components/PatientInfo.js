/*
ver1

import React from 'react';

function PatientInfo({ patient }) {
	// Debugging log to check the structure of patient data
  console.log('Patient Data:', patient);

  return (
    <div className="patient-info">
      <h2>Patient Information</h2>
      <p><strong>Name:</strong> {patient.firstName} {patient.lastName}</p>
      <p><strong>Member ID:</strong> {patient.memberID}</p>
      <p><strong>Address:</strong> {patient.address}, {patient.city}, {patient.state} {patient.zip}</p>
      <p><strong>Date of Birth:</strong> {patient.dob}</p>
      <p><strong>Gender:</strong> {patient.gender}</p>

      <h2>Provider Information</h2>
      <p><strong>Provider Name:</strong> {patient.provider?.name || 'N/A'}</p>
      <p><strong>NPI:</strong> {patient.provider?.npi || 'N/A'}</p>
      <p><strong>Address:</strong> {patient.provider?.address || 'N/A'}</p>
      <p><strong>City, State, ZIP:</strong> {patient.provider?.city || 'N/A'}, {patient.provider?.state || 'N/A'} {patient.provider?.zip || 'N/A'}</p>
      <p><strong>Tax ID:</strong> {patient.provider?.taxID || 'N/A'}</p>
      <p><strong>Phone:</strong> {patient.provider?.contact?.phone || 'N/A'}</p>
      <p><strong>Fax:</strong> {patient.provider?.contact?.fax || 'N/A'}</p>

      <h3>Insurance Information</h3>
      <p><strong>Payer Name:</strong> {patient.insurance?.payerName}</p>
      <p><strong>Payer ID:</strong> {patient.insurance?.payerID}</p>

      <h3>Claim Information</h3>
      <p><strong>Claim ID:</strong> {patient.claim?.claimID}</p>
      <p><strong>Claim Amount:</strong> {patient.claim?.amount}</p>
      <p><strong>Facility Code:</strong> {patient.claim?.facilityCode}</p>
      <p><strong>Service Type:</strong> {patient.claim?.serviceType}</p>
      <p><strong>Service Date:</strong> {patient.claim?.serviceDate}</p>
    </div>
  );
}

export default PatientInfo;

*/
/*
import React from 'react';

function PatientInfo({ patient }) {
  // Debugging log to check the structure of patient data
  console.log('Patient Data:', patient);

  return (
    <div className="patient-info">
      <h2>Patient Information</h2>
      <p><strong>Name:</strong> {patient.firstName} {patient.lastName}</p>
      <p><strong>Member ID:</strong> {patient.memberID}</p>
      <p><strong>Address:</strong> {patient.address}, {patient.city}, {patient.state} {patient.zip}</p>
      <p><strong>Date of Birth:</strong> {patient.dob}</p>
      <p><strong>Gender:</strong> {patient.gender}</p>

      <h3>Claim Information</h3>
      <p><strong>Claim ID:</strong> {patient.claim?.claimID}</p>
      <p><strong>Claim Amount:</strong> {patient.claim?.amount}</p>
      <p><strong>Facility Code:</strong> {patient.claim?.facilityCode}</p>
      <p><strong>Service Type:</strong> {patient.claim?.serviceType}</p>
      <p><strong>Service Date:</strong> {patient.claim?.serviceDate}</p>

      <h3>Insurance Information</h3>
      <p><strong>Payer Name:</strong> {patient.insurance?.payerName}</p>
      <p><strong>Payer ID:</strong> {patient.insurance?.payerID}</p>
    </div>
  );
}

export default PatientInfo;
*/

import React from 'react';

function PatientInfo({ patient }) {
  console.log('Patient Data:', patient); // Debugging log

  return (
    <div className="patient-info">
      <h2>Patient Information</h2>
      <p><strong>Name:</strong> {patient.firstName} {patient.lastName}</p>
      <p><strong>Member ID:</strong> {patient.memberID}</p>
      <p><strong>Address:</strong> {patient.address}, {patient.city}, {patient.state} {patient.zip}</p>
      <p><strong>Date of Birth:</strong> {patient.dob}</p>
      <p><strong>Gender:</strong> {patient.gender}</p>

      <h3>Insurance Information</h3>
      <p><strong>Payer Name:</strong> {patient.insurance?.payerName}</p>
      <p><strong>Payer ID:</strong> {patient.insurance?.payerID}</p>

      <h3>Claim Information</h3>
      <p><strong>Claim ID:</strong> {patient.claim?.claimID}</p>
      <p><strong>Claim Amount:</strong> {patient.claim?.amount}</p>
      <p><strong>Facility Code:</strong> {patient.claim?.facilityCode}</p>
      <p><strong>Service Type:</strong> {patient.claim?.serviceType}</p>
      <p><strong>Service Date:</strong> {patient.claim?.serviceDate}</p>
    </div>
  );
}

export default PatientInfo;