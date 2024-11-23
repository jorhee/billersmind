import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { CircularProgress, Typography, CardContent } from '@mui/material';
import { CalendarToday, Place, LocalHospital } from '@mui/icons-material';
import '../css/GetNoaPage.css'; // Import the custom CSS

export default function GetNoaPage() {

  const { noaId } = useParams(); // Get noaId from route parameters
  const [noaDetails, setNoaDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [providerName, setProviderName] = useState('');
  const [patientFullName, setPatientFullName] = useState('');
  const [payerName, setPayerName] = useState('');

  useEffect(() => {
    const fetchNoaDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage

        if (!token) {
          throw new Error('Authentication token not found.');
        }

        // Fetch NOA details by ID
        const response = await fetch(`${process.env.REACT_APP_BE_URL}/batchedNoa/${noaId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setNoaDetails(data);

        // Fetch Provider Name
        const providerResponse = await fetch(`${process.env.REACT_APP_BE_URL}/providers/${data.providerId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!providerResponse.ok) {
          throw new Error(`Provider fetch error: ${providerResponse.status}`);
        }

        const providerData = await providerResponse.json();
        setProviderName(providerData.name);

        // Fetch Patient Full Name
        const patientResponse = await fetch(`${process.env.REACT_APP_BE_URL}/patients/${data.patientId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!patientResponse.ok) {
          throw new Error(`Patient fetch error: ${patientResponse.status}`);
        }

        const patientData = await patientResponse.json();
        setPatientFullName(`${patientData.lastName}, ${patientData.firstName}`);

        // Fetch Payer Name
        const payerResponse = await fetch(`${process.env.REACT_APP_BE_URL}/payers/${data.payerId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!payerResponse.ok) {
          throw new Error(`Payer fetch error: ${payerResponse.status}`);
        }

        const payerData = await payerResponse.json();
        setPayerName(payerData.name);

        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message || 'Failed to load NOA details.');
      }
    };

    fetchNoaDetails();
  }, [noaId]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <CircularProgress />
        <Typography variant="h6" className="mt-3">
          Loading NOA details...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!noaDetails) {
    return (
      <Container className="text-center mt-5">
        <Typography variant="h6" color="error">
          No details found for NOA ID: {noaId}.
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <Typography variant="h4" component="h1" className="text-center">
            Notice of Admission (NOA) Details
          </Typography>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="noa-card">
            <CardContent>
              {/* Removed NOA ID */}
              <Typography variant="body1">Provider: {providerName || 'N/A'}</Typography>
              <Typography variant="body1">Patient: {patientFullName || 'N/A'}</Typography>
              <Typography variant="body1">Payer: {payerName || 'N/A'}</Typography>

              <Typography variant="body1">
                <Place /> Place of Service: {noaDetails.placeOfService || 'N/A'}
              </Typography>
              <Typography variant="body1">Member ID: {noaDetails.memberId || 'N/A'}</Typography>
              <Typography variant="body1">
                <CalendarToday /> Admit Date: {noaDetails.admitDate || 'N/A'}
              </Typography>
              <Typography variant="body1">Type of Bill: {noaDetails.typeOfBill || 'N/A'}</Typography>

              {noaDetails.benefitPeriod && noaDetails.benefitPeriod.length > 0 && (
                <Typography variant="body1">
                  <strong>Benefit Period:</strong>
                  <ul>
                    {noaDetails.benefitPeriod.map((benefit, index) => (
                      <li key={index}>
                        Benefit #: {benefit.benefitNum}, Start Date: {benefit.BeneStartDate}, End Date: {benefit.BeneTermDate}
                      </li>
                    ))}
                  </ul>
                </Typography>
              )}

              <Typography variant="body1">
                <LocalHospital /> Primary Diagnosis: {noaDetails.primaryDiagnosis || 'N/A'}
              </Typography>
              <Typography variant="body1">
                Attending MD: {noaDetails.AttMd?.firstName} {noaDetails.AttMd?.lastName || 'N/A'}
              </Typography>
              <Typography variant="body1">
                NPI: {noaDetails.AttMd?.npi || 'N/A'}
              </Typography>
              <Typography variant="body1">Sent Date: {noaDetails.sentDate || ''}</Typography>
              <Typography variant="body1">Finalized Date: {noaDetails.finalizedDate || ''}</Typography>
              <Typography variant="body1">Discharge Date: {noaDetails.dcDate || 'Not Yet Discharge'}</Typography>
              <Typography variant="body1">Discharge Reason: {noaDetails.dcReason || 'Not Yet Discharge'}</Typography>
              <Typography variant="body1">
                Is NOA Late: {noaDetails.isNoaLate ? 'Yes' : 'No'}
              </Typography>

              {noaDetails.comments && noaDetails.comments.length > 0 && (
                <div>
                  <strong>Comments:</strong>
                  <ul>
                    {noaDetails.comments.map((comment, index) => (
                      <li key={index}>
                        <Typography variant="body2">
                          {comment.remarks} ({comment.status})
                        </Typography>
                        <Typography variant="body2">Action: {comment.actions}</Typography>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="text-center">
          <Button variant="contained" className="noa-button" onClick={() => window.history.back()}>
            Back
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
