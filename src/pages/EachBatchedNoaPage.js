import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Table } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';

export default function EachBatchedNoaPage() {
    const { id } = useParams(); // Get batchNoa ID from URL
    const [noaDetails, setNoaDetails] = useState(null);
    const [providerName, setProviderName] = useState('');

    // Fetch NOA details by ID
    useEffect(() => {
        const fetchNoaDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:4000/batchNoa/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = await response.json();
                
                setNoaDetails(data);
                setProviderName(data.providerName || 'Provider'); // Assuming providerName is part of the response

            } catch (error) {
                console.error("Error fetching NOA details:", error);
            }
        };
        fetchNoaDetails();
    }, [id]);

    if (!noaDetails) return <p>Loading...</p>;

    return (
        <Container className="p-4">
            <Row className="mb-3 align-items-center">
                <Col>
                    <h2 className="text-primary">NOA Details for {providerName}</h2>
                </Col>
                <Col className="text-end">
                    <Link to={`/providers/${noaDetails.providerId}`}>
                        <Button variant="secondary">
                            <FaArrowLeft /> Back to Provider
                        </Button>
                    </Link>
                </Col>
            </Row>

            <Card className="shadow-sm">
                <Card.Body>
                    <h5>Notice of Election Details</h5>
                    <Table striped bordered hover responsive="md" className="mt-3">
                        <tbody>
                            <tr>
                                <th>Place of Service</th>
                                <td>{noaDetails.placeOfService || 'N/A'}</td>
                            </tr>
                            <tr>
                                <th>Type of Bill</th>
                                <td>{noaDetails.typeOfBill || 'N/A'}</td>
                            </tr>
                            <tr>
                                <th>Admit Date</th>
                                <td>{noaDetails.admitDate || 'N/A'}</td>
                            </tr>
                            <tr>
                                <th>Primary Diagnosis</th>
                                <td>{noaDetails.primaryDiagnosis || 'N/A'}</td>
                            </tr>
                            <tr>
                                <th>Attending MD</th>
                                <td>{`${noaDetails.AttMd.firstName} ${noaDetails.AttMd.lastName} (NPI: ${noaDetails.AttMd.npi})`}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
}
