export function parseEDIFile(text) {
  const lines = text.split('~');
  const patients = [];
  let currentPatient = null;
  let providerInfo = null; // To store provider info since it's not patient-specific

  lines.forEach((line) => {
    const segments = line.split('*');
    const segmentId = segments[0];

    // Parsing patient information
    if (segmentId === 'NM1' && segments[1] === 'IL') { // Patient Information
      if (currentPatient) patients.push(currentPatient); // Save previous patient
      currentPatient = {
        firstName: segments[3] || '',
        lastName: segments[4] || '',
        memberID: segments[9] || '',
        provider: {}, // Initialize provider as an empty object for each patient
      };
    } else if (segmentId === 'N3' && currentPatient) { // Patient Address Line
      currentPatient.address = segments[1];
    } else if (segmentId === 'N4' && currentPatient) { // Patient City, State, ZIP
      currentPatient.city = segments[1];
      currentPatient.state = segments[2];
      currentPatient.zip = segments[3];
    } else if (segmentId === 'DMG' && currentPatient) { // Patient Date of Birth & Gender
      currentPatient.dob = segments[2];
      currentPatient.gender = segments[3];
    } else if (segmentId === 'NM1' && segments[1] === '85') { // Provider Information (only one provider in file)
      console.log('Provider Segment Found:', segments); // Debugging log for provider segment
      providerInfo = {
        name: segments[3] || '', // Provider name
        npi: segments[9] || '', // Provider NPI
      };
    } else if (segmentId === 'N3' && providerInfo) { // Provider Address
      providerInfo.address = segments[1];
    } else if (segmentId === 'N4' && providerInfo) { // Provider City, State, ZIP
      providerInfo.city = segments[1];
      providerInfo.state = segments[2];
      providerInfo.zip = segments[3];
    } else if (segmentId === 'REF' && segments[1] === 'EI' && providerInfo) { // Provider Tax ID
      providerInfo.taxID = segments[2];
    } else if (segmentId === 'PER' && providerInfo) { // Provider Contact Information
      if (!providerInfo.contact) {
        providerInfo.contact = {};
      }
      if (segments[3] === 'TE') {
        providerInfo.contact.phone = segments[4];
      } else if (segments[3] === 'FX') {
        providerInfo.contact.fax = segments[4];
      }
    } else if (segmentId === 'CLM' && currentPatient) { // Claim Information
      currentPatient.claim = {
        claimID: segments[1],
        amount: segments[2],
        facilityCode: segments[5].split(':')[0],
        serviceType: segments[5].split(':')[1],
      };
    } else if (segmentId === 'DTP' && segments[1] === '434' && currentPatient) { // Claim Service Dates
      currentPatient.claim = {
        ...currentPatient.claim,
        serviceDate: segments[3],
      };
    } else if (segmentId === 'NM1' && segments[1] === 'PR' && currentPatient) { // Payer (Insurance) Information
      currentPatient.insurance = {
        payerName: segments[3],
        payerID: segments[9],
      };
    }
  });

  if (currentPatient) patients.push(currentPatient); // Add the last patient

  // Return patients and providerInfo (only one provider per file)
  return { patients, providerInfo };
}
