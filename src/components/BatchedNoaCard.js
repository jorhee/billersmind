
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Card, Table } from 'react-bootstrap';
import '../css/BatchedNoaCard.css';
import { Container, CircularProgress, Typography } from '@mui/material'; // Material-UI imports

export default function BatchedNoaCard() {
    const navigate = useNavigate();
    const location = useLocation();
    const { providerId } = useParams();
    const [batchedNoas, setBatchedNoas] = useState([]);
    const [providerName, setProviderName] = useState('');
    const [patientData, setPatientData] = useState({});
    const [payerData, setPayerData] = useState({});
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    // Fetch Batched NOAs, provider name, patient data, and payer names
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true); // Start loading
                const token = localStorage.getItem('token');

                // Fetch Batched NOAs
                const batchedNoasResponse = await fetch(`${process.env.REACT_APP_BE_URL}/batchedNoa/${providerId}/all`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (batchedNoasResponse.status === 401) {
                    alert("Unauthorized: Please log in.");
                    navigate('/login');
                    return;
                }

                if (!batchedNoasResponse.ok) {
                    throw new Error(`HTTP error! Status: ${batchedNoasResponse.status}`);
                }

                const batchedNoasData = await batchedNoasResponse.json();
                setBatchedNoas(batchedNoasData);

                // Fetch provider name
                const providerResponse = await fetch(`${process.env.REACT_APP_BE_URL}/providers/${providerId}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!providerResponse.ok) {
                    throw new Error(`HTTP error! Status: ${providerResponse.status}`);
                }

                const providerData = await providerResponse.json();
                setProviderName(providerData.name);

                // Fetch patient names
                const patientDataMap = {};
                const payerDataMap = {};

                for (const noa of batchedNoasData) {
                    const { patientId, payerId } = noa;

                    // Fetch patient name if not already fetched
                    if (patientId && !patientDataMap[patientId]) {
                        const patientResponse = await fetch(`${process.env.REACT_APP_BE_URL}/patients/${patientId}`, {
                            method: 'GET',
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            }
                        });

                        if (!patientResponse.ok) throw new Error(`Patient fetch error: ${patientResponse.status}`);
                        const patientInfo = await patientResponse.json();
                        patientDataMap[patientId] = `${patientInfo.lastName}, ${patientInfo.firstName}`;
                    }

                    // Fetch payer name if not already fetched
                    if (payerId && !payerDataMap[payerId]) {
                        const payerResponse = await fetch(`${process.env.REACT_APP_BE_URL}/payers/${payerId}`, {
                            method: 'GET',
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            }
                        });

                        if (!payerResponse.ok) throw new Error(`Payer fetch error: ${payerResponse.status}`);
                        const payerInfo = await payerResponse.json();
                        payerDataMap[payerId] = payerInfo.name; // Assuming the response has a 'name' field
                    }
                }

                setPatientData(patientDataMap);
                setPayerData(payerDataMap);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false); // Stop loading
            }
        };

        fetchData();
    }, [providerId, navigate]);

    if (isLoading) {
        return (
            <Container className="text-center mt-5">
                <CircularProgress />
                <Typography variant="h6" className="mt-3">
                    Loading NOA details...
                </Typography>
            </Container>
        );
    }

    return (
        <Card className="m-3 mb-3">
            <div className="batchedNoaCard">
                <Card.Body className="text-auto">
                    <Card.Title>
                        <Link to={location.pathname === `/batchedNoa/${providerId}/all` ? `/providers/${providerId}` : `/batchedNoa/${providerId}/all`}>
                            {location.pathname === `/batchedNoa/${providerId}/all` ? 'Back to Provider Page' : 'Submitted NOA List'}
                        </Link>
                    </Card.Title>
                    <Card.Text>All Submitted NOAs for Provider: {providerName}</Card.Text>

                    <Table striped bordered hover responsive="md" className="mt-3">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Patient Full Name</th>
                                <th>Payer Name</th>
                                <th>Member ID</th>
                                <th>Place of Service</th>
                                <th>Admit Date</th>
                                <th>Type of Bill</th>
                                <th>Bene#</th>
                                <th>Bene Start Date</th>
                                <th>Bene Term Date</th>
                                <th>Sent Date</th>
                                <th>Late NOA?</th>
                                <th>Finalized Date</th>
                                <th>Status</th>
                                <th>Comment</th>
                                <th>Update NOA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {batchedNoas.length > 0 ? (
                                batchedNoas.map((noa, index) => (
                                    <tr
                                        key={noa._id}
                                        onClick={() => navigate(`/batchedNoa/${noa._id}`)}
                                        className="batched-noa-row"
                                    >
                                        <td>{index + 1}</td>
                                        <td>{patientData[noa.patientId] || 'Not Found'}</td>
                                        <td>{payerData[noa.payerId] || 'Not Found'}</td>
                                        <td>{noa.memberId || 'N/A'}</td>
                                        <td>{noa.placeOfService || 'N/A'}</td>
                                        <td>{noa.admitDate || 'N/A'}</td>
                                        <td>{noa.typeOfBill || 'N/A'}</td>
                                        <td>
                                            {noa.benefitPeriod.length > 0
                                                ? noa.benefitPeriod.map((benefit) => benefit.benefitNum).join(', ')
                                                : 'N/A'}
                                        </td>
                                        <td>
                                            {noa.benefitPeriod.length > 0
                                                ? noa.benefitPeriod.map((benefit) => benefit.BeneStartDate).join(', ')
                                                : 'N/A'}
                                        </td>
                                        <td>
                                            {noa.benefitPeriod.length > 0
                                                ? noa.benefitPeriod.map((benefit) => benefit.BeneTermDate).join(', ')
                                                : 'N/A'}
                                        </td>
                                        <td>{noa.sentDate || 'N/A'}</td>
                                        <td
                                            style={{
                                                color: noa.isNoaLate ? 'red' : 'inherit',
                                                fontWeight: noa.isNoaLate ? 'bold' : 'normal',
                                            }}
                                        >
                                            {noa.isNoaLate ? 'Yes' : 'No' || 'N/A'}
                                        </td>
                                        <td>{noa.finalizedDate || 'N/A'}</td>
                                        <td>{noa.noaStatus || 'N/A'}</td>
                                        <td>
                                          {noa.comments?.length > 0 
                                            ? (() => {
                                                // Sort comments by date (most recent first)
                                                const sortedComments = [...noa.comments].sort(
                                                  (a, b) => new Date(b.date) - new Date(a.date)
                                                );

                                                // Get the most recent comment
                                                const recentComment = sortedComments[0];

                                                // Display the most recent comment's details
                                                return (
                                                  <div>
                                                    <strong>Remarks:</strong> {recentComment.remarks || 'N/A'} <br />
                                                    <strong>Actions:</strong> {recentComment.actions || 'N/A'} <br />
                                                    <strong>Status:</strong> {recentComment.status || 'N/A'} <br />
                                                    <strong>Date:</strong> {new Date(recentComment.date).toLocaleDateString() || 'N/A'}
                                                  </div>
                                                );
                                              })()
                                            : 'N/A'}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="15" className="text-center">
                                        No Batched NOAs Found for This Provider
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </div>
        </Card>
    );
}