// pages/SentElecClaims.js
/* v1

import React, { useState } from 'react';
import { parseEDIFile } from '../components/ediParser';
import PatientInfo from '../components/PatientInfo';



function SentElecClaims() {
  const [file, setFile] = useState(null);
  const [patients, setPatients] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleParseFile = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        console.log('File Content:', fileContent); // Debugging log to see the raw file content

        const parsedPatients = parseEDIFile(fileContent);
        console.log('Parsed Patients:', parsedPatients); // Debugging log to see parsed patients data

        setPatients(parsedPatients);
      };
      reader.readAsText(file);
    } else {
      console.error('No file selected');
    }
  };

  return (
    <div className="sent-elec-claims">
      <h1>Sent Electronic Claims</h1>
      
      
      <input type="file" onChange={handleFileChange} accept=".txt, .edi" />
      
      
      <button onClick={handleParseFile}>Parse EDI File</button>

      
      <div>
        {patients.length > 0 ? (
          patients.map((patient, index) => (
            <div key={index}>
              <PatientInfo patient={patient} />
            </div>
          ))
        ) : (
          <p>No patients to display.</p>
        )}
      </div>
    </div>
  );
}

export default SentElecClaims;

*/

/*

v2


import React, { useState } from 'react';
import { parseEDIFile } from '../components/ediParser';
import PatientInfo from '../components/PatientInfo';

function SentElecClaims() {
  const [file, setFile] = useState(null);
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null); // Reset any previous errors
  };

  const handleParseFile = () => {
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const fileContent = e.target.result;
          console.log('File Content:', fileContent);  // Debugging log to see the raw file content

          const parsedPatients = parseEDIFile(fileContent);
          console.log('Parsed Patients:', parsedPatients);  // Debugging log to see parsed patients data

          setPatients(parsedPatients);
        } catch (err) {
          console.error('Error parsing file:', err);
          setError('There was an error parsing the file. Please try again.');
        } finally {
          setIsLoading(false);
        }
      };

      reader.onerror = () => {
        setIsLoading(false);
        setError('Failed to read the file. Please try again.');
      };

      reader.readAsText(file);
    } else {
      setError('No file selected');
    }
  };

  return (
    <div className="sent-elec-claims">
      <h1>Sent Electronic Claims</h1>

      <input type="file" onChange={handleFileChange} accept=".txt, .edi" />
      <button onClick={handleParseFile} disabled={isLoading}>
        {isLoading ? 'Parsing...' : 'Parse EDI File'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        {patients.length > 0 ? (
          patients.map((patient, index) => {
            console.log('Rendering Patient:', patient);  // Check each patient's data
            return (
              <div key={index}>
                <PatientInfo patient={patient} />
              </div>
            );
          })
        ) : (
          <p>No patients to display.</p>
        )}
      </div>
    </div>
  );
}

export default SentElecClaims;
*/
import React, { useState } from 'react';
import { parseEDIFile } from '../components/ediParser';
import PatientInfo from '../components/PatientInfo';

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

      {/* Display parsed patient data */}
      <div>
        {patients.length > 0 ? (
          patients.map((patient, index) => (
            <div key={index}>
              <PatientInfo patient={patient} />
            </div>
          ))
        ) : (
          <p>No patients to display.</p>
        )}
      </div>
    </div>
  );
}

export default SentElecClaims;
