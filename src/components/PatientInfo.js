
import React from 'react';

function PatientInfo({ patient }) {
  return (
    <div className="patient-info">
      <h2>Patient Information</h2>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{patient.firstName} {patient.lastName}</td>
          </tr>
          <tr>
            <th>Member ID</th>
            <td>{patient.memberID}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{patient.address}, {patient.city}, {patient.state} {patient.zip}</td>
          </tr>
          <tr>
            <th>Date of Birth</th>
            <td>{patient.dob}</td>
          </tr>
          <tr>
            <th>Gender</th>
            <td>{patient.gender}</td>
          </tr>
          <tr>
            <th>Insurance</th>
            <td>{patient.insurance?.payerName}</td>
          </tr>
          <tr>
            <th>Claim ID</th>
            <td>{patient.claim?.claimID}</td>
          </tr>
          <tr>
            <th>Claim Amount</th>
            <td>{patient.claim?.amount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PatientInfo;
