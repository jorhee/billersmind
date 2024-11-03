import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, Table, Button } from 'react-bootstrap';
import { FaUser, FaBirthdayCake, FaMapMarkerAlt, FaHospital } from 'react-icons/fa';

export default function PatientPageCard() {
	const navigate = useNavigate();
    const { patientId } = useParams();
    const { providerId } = useParams();
    const [patient, setPatient] = useState(null);
    const [noaData, setNoaData] = useState([]);
    const [providerData, setProviderData] = useState(null);

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const token = localStorage.getItem('token');

                // Fetch patient data
                const patientResponse = await fetch(`http://localhost:4000/patients/${patientId}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (!patientResponse.ok) throw new Error(`Patient fetch error: ${patientResponse.status}`);
                const patientData = await patientResponse.json();
                setPatient(patientData);

                 // Fetch noa data based on each noaId in patientData.noaId array
                if (Array.isArray(patientData.noaId) && patientData.noaId.length > 0) {
                    const noaResponses = await Promise.all(
                        patientData.noaId.map(noaId =>
                            fetch(`http://localhost:4000/batchedNoa/${noaId}`, {
                                method: 'GET',
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${token}`
                                }
                            }).then(response => response.ok ? response.json() : null)
                        )
                    );
                    setNoaData(noaResponses.filter(data => data !== null)); // Filter out any failed requests
                }

                // Fetch provider data based on patient providerId
                if (patientData.providerId) {
                    const providerResponse = await fetch(`http://localhost:4000/providers/${patientData.providerId}`, {
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
                    if (!providerResponse.ok) throw new Error(`Provider fetch error: ${providerResponse.status}`);
                    const providerData = await providerResponse.json();
                    setProviderData(providerData);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchPatientData();
    }, [patientId]);

    if (!patient) return <p>Loading patient data...</p>;

    return (
        <Card className="m-3 p-3">
            <Card.Header>
                <h2>
                    <FaUser /> Patient Details: {patient.lastName}, {patient.firstName}
                </h2>
            </Card.Header>
            <Card.Body>
                <Table bordered hover>
                    <tbody>
                        <tr>
                            <td><strong><FaBirthdayCake /> Date of Birth</strong></td>
                            <td>{patient.dateOfBirth}</td>
                        </tr>
                        <tr>
                            <td><strong>Gender</strong></td>
                            <td>{patient.gender === 'M' ? 'Male' : patient.gender === 'F' ? 'Female' : 'Unknown'}</td>
                        </tr>
                        <tr>
                            <td><strong><FaMapMarkerAlt /> Address</strong></td>
                            <td>{`${patient.address.Address}, ${patient.address.City}, ${patient.address.State} ${patient.address.Zip}`}</td>
                        </tr>
                        <tr>
                            <td><strong>Member ID</strong></td>
                            <td>{patient.memberId}</td>
                        </tr>
                        <tr>
                            <td><strong><FaHospital /> Provider</strong></td>
                            <td>{providerData ? providerData.name : 'Fetching provider...'}</td>
                        </tr>
                        <tr>
                            <td><strong>Status</strong></td>
                            <td>{patient.isActive ? 'Active' : 'Inactive'}</td>
                        </tr>
                    </tbody>
                </Table>

                <h4 className="mt-4">Batched NOA Details</h4>
                {noaData.length > 0 ? (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>NOA ID</th>
                                <th>Admit Date</th>
                                <th>Type of Bill</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {noaData.map((noa, index) => (
                                <tr key={noa._id}>
                                    <td>{index + 1}</td>
                                    <td>{noa._id}</td>
                                    <td>{noa.admitDate}</td>
                                    <td>{noa.typeOfBill}</td>
                                    <td>{noa.noaStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <p>No Batched NOA records available for this patient.</p>
                )}

                <Button onClick={() => navigate(`/providers/${patient.providerId}`)}>
            		Back to Provider Page
        		</Button>
            </Card.Body>
        </Card>
    );
}
