
//table version 1:
import React, { useState } from 'react';
import { parseEDIFile } from '../components/ediParser';
import { Table } from 'react-bootstrap';

function SentElecClaims() {
  const [file, setFile] = useState(null);
  const [patients, setPatients] = useState([]);
  const [provider, setProvider] = useState(null); // Store provider info here

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleParseFile = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        console.log('File Content:', fileContent); // Debugging log to see the raw file content

        const parsedData = parseEDIFile(fileContent); // Parse the file
        console.log('Parsed Data:', parsedData); // Log the parsed data

        setPatients(parsedData.patients); // Set patient data
        setProvider(parsedData.providerInfo); // Set provider data
      };
      reader.readAsText(file);
    } else {
      console.error('No file selected');
    }
  };

  return (
    <div className="sent-elec-claims">
      <h1>Sent Electronic Claims</h1>

      {/* File input for selecting the EDI file */}
      <input type="file" onChange={handleFileChange} accept=".txt, .edi" />

      {/* Button to trigger file parsing */}
      <button onClick={handleParseFile}>Parse EDI File</button>

      {/* Display provider information separately */}
      {provider && (
        <div>
          <h2>Provider Information</h2>
          <p><strong>Provider Name:</strong> {provider.name || 'N/A'}</p>
          <p><strong>NPI:</strong> {provider.npi || 'N/A'}</p>
          <p><strong>Address:</strong> {provider.address || 'N/A'}</p>
          <p><strong>City, State, ZIP:</strong> {provider.city || 'N/A'}, {provider.state || 'N/A'} {provider.zip || 'N/A'}</p>
          <p><strong>Tax ID:</strong> {provider.taxID || 'N/A'}</p>
          <p><strong>Phone:</strong> {provider.contact?.phone || 'N/A'}</p>
          <p><strong>Fax:</strong> {provider.contact?.fax || 'N/A'}</p>
        </div>
      )}

      {/* Display patient data in a React Bootstrap Table */}
      <div>
        {patients.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Member ID</th>
                <th>Address</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Insurance Name</th>
                <th>Payer ID</th> {/* New column for payer ID */}
                <th>Claim ID</th>
                <th>Claim Amount</th>
                <th>Facility Code</th> {/* New column for facility code */}
                <th>Service Date</th> {/* New column for service date */}
                <th>Service Type</th> {/* New column for service type */}
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={index}>
                  <td>{patient.firstName} {patient.lastName}</td>
                  <td>{patient.memberID}</td>
                  <td>{patient.address}, {patient.city}, {patient.state} {patient.zip}</td>
                  <td>{patient.dob}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.insurance?.payerName}</td>
                  <td>{patient.insurance?.payerID}</td> {/* Display payer ID */}
                  <td>{patient.claim?.claimID}</td>
                  <td>{patient.claim?.amount}</td>
                  <td>{patient.claim?.facilityCode}</td> {/* Display facility code */}
                  <td>{patient.claim?.serviceDate}</td> {/* Display service date */}
                  <td>{patient.claim?.serviceType}</td> {/* Display service type */}
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No patients to display.</p>
        )}
      </div>
    </div>
  );
}

export default SentElecClaims;
