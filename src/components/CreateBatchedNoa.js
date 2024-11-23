import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/CreateBatchedNoa.css'
import '../css/notyf.css';
import { Notyf } from 'notyf';

import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { BsFillPersonFill } from 'react-icons/bs';


export default function CreateBatchedNoa() {

    const notyf = new Notyf({
      position: {
        x: 'center', // Horizontal axis: center
        y: 'center', // Vertical axis: center
      },
      duration: 3000, // Optional: Notification duration in milliseconds
    });
    const { providerId } = useParams(); 
    const navigate = useNavigate(); 

    const [patientId, setPatientId] = useState('');
    const [placeOfService, setPlaceOfService] = useState('');
    const [payerId, setPayerId] = useState('');
    const [memberId, setMemberId] = useState('');
    const [admitDate, setAdmitDate] = useState('');
    const [typeOfBill, setTypeOfBill] = useState('');
    const [primaryDiagnosis, setPrimaryDiagnosis] = useState('');
    const [AttMd, setAttMd] = useState({
        lastName: '',
        firstName: '',
        npi: ''
    });
    const [benefitPeriod, setBenefitPeriod] = useState([{ benefitNum: 0, BeneStartDate: '' }]);

    async function registerBatchedNoa(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${process.env.REACT_APP_BE_URL}/batchedNoa/${providerId}/batch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    patientId,
                    placeOfService,
                    payerId,
                    memberId: memberId.toUpperCase(),
                    admitDate,
                    typeOfBill,
                    primaryDiagnosis: primaryDiagnosis.toUpperCase(),
                    AttMd: {
                        lastName: AttMd.lastName.toUpperCase(),
                        firstName: AttMd.firstName.toUpperCase(),
                        npi: AttMd.npi
                    },
                    benefitPeriod: benefitPeriod.map(b => ({
                        benefitNum: b.benefitNum,
                        BeneStartDate: b.BeneStartDate
                    }))
                }),
            });

            const data = await response.json();

            if (response.ok) {
            	console.log('Response:', response);
                notyf.success('NOA successfully created');
                navigate(`/providers/${providerId}`);
            } else {
                notyf.error(data.message || 'Error creating Batched NOA');
                console.log('Data:', data);
            }
            console.log({ patientId, placeOfService, payerId, memberId, admitDate, typeOfBill, benefitPeriod, primaryDiagnosis, AttMd });
        } catch (error) {
            console.error('Error registering Batched NOA:', error);
            notyf.error('An error occurred. Please try again.');
        }
    }

return (
    <Container className="my-4 mx-5">
        <Card className="p-4 shadow-lg" style={{ backgroundColor: '#f8f9fa' }}>
            <h2 className="text-center text-purple mb-4">Create Batched NOA</h2>
            <Form onSubmit={registerBatchedNoa}>
                
                {/* Patient ID */}
                <Form.Group controlId="patientId" className="mb-3">
                    <Form.Label><BsFillPersonFill className="me-2 text-purple"/> Patient ID:</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={patientId} 
                        onChange={e => setPatientId(e.target.value)} 
                        required 
                        className="bg-light border border-secondary"
                    />
                </Form.Group>

                {/* Place of Service */}
                <Form.Group controlId="placeOfService" className="mb-3">
                    <Form.Label className="text-purple">Place of Service:</Form.Label>
                    <Form.Select 
                        value={placeOfService} 
                        onChange={e => setPlaceOfService(e.target.value)} 
                        required 
                        className="bg-light border border-secondary"
                    >
                        <option value="" disabled>Select Place of Service</option>
                        <option value="HOME">HOME</option>
                        <option value="ALF">ALF</option>
                        <option value="SNF">SNF</option>
                        <option value="BNC">BNC</option>
                    </Form.Select>
                </Form.Group>

                {/* Payer ID */}
                <Form.Group controlId="payerId" className="mb-3">
                    <Form.Label className="text-purple">Payer ID:</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={payerId} 
                        onChange={e => setPayerId(e.target.value)} 
                        required 
                        className="bg-light border border-secondary"
                    />
                </Form.Group>

                {/* Member ID */}
                <Form.Group controlId="memberId" className="mb-3">
                    <Form.Label className="text-purple">Member ID:</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={memberId} 
                        onChange={e => setMemberId(e.target.value)} 
                        required 
                        className="bg-light border border-secondary"
                    />
                </Form.Group>

                {/* Admit Date */}
                <Form.Group controlId="admitDate" className="mb-3">
                    <Form.Label className="text-purple">Admit Date:</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={admitDate} 
                        onChange={e => setAdmitDate(e.target.value)} 
                        required 
                        className="bg-light border border-secondary"
                        placeholder="MM/DD/YYYY"
                    />
                </Form.Group>

                {/* Type of Bill */}
                <Form.Group controlId="typeOfBill" className="mb-3">
                    <Form.Label className="text-purple">Type of Bill:</Form.Label>
                    <Form.Select 
                        type="text" 
                        value={typeOfBill} 
                        onChange={e => setTypeOfBill(e.target.value)} 
                        required 
                        className="bg-light border border-secondary"
                    >
                        <option value="" disabled>Select Type of Bill</option>
                        <option value="81A">81A</option>
                        <option value="81C">81C</option>
                        <option value="81B">81B</option>
                        <option value="81D">81D</option>
                    </Form.Select>
                </Form.Group>

                {/* Primary Diagnosis */}
                <Form.Group controlId="primaryDiagnosis" className="mb-3">
                    <Form.Label className="text-purple">Primary Diagnosis:</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={primaryDiagnosis} 
                        onChange={e => setPrimaryDiagnosis(e.target.value)} 
                        required 
                        className="bg-light border border-secondary"
                    />
                </Form.Group>

                {/* Attending MD */}
                <fieldset className="border p-3 rounded mb-4">
                    <legend className="w-auto text-purple">Attending MD</legend>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="attLastName" className="mb-3">
                                <Form.Label className="text-purple">Last Name:</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={AttMd.lastName} 
                                    onChange={e => setAttMd({ ...AttMd, lastName: e.target.value })} 
                                    required 
                                    className="bg-light border border-secondary"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="attFirstName" className="mb-3">
                                <Form.Label className="text-purple">First Name:</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={AttMd.firstName} 
                                    onChange={e => setAttMd({ ...AttMd, firstName: e.target.value })} 
                                    required 
                                    className="bg-light border border-secondary"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Group controlId="attNPI" className="mb-3">
                                <Form.Label className="text-purple">NPI:</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={AttMd.npi} 
                                    onChange={e => setAttMd({ ...AttMd, npi: e.target.value })} 
                                    required 
                                    className="bg-light border border-secondary"
                                    placeholder="10-digit number"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </fieldset>

                {/* Benefit Period */}
                <fieldset className="border p-3 rounded mb-4">
                    <legend className="w-auto text-purple">Benefit Period</legend>
                    {benefitPeriod.map((period, index) => (
                        <Row key={index} className="align-items-center mb-2">
                            <Col md={6}>
                                <Form.Group controlId={`benefitNum-${index}`} className="mb-3">
                                    <Form.Label className="text-purple">Benefit Number:</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        value={period.benefitNum} 
                                        onChange={e => {
                                            const newBenefitPeriod = [...benefitPeriod];
                                            newBenefitPeriod[index].benefitNum = Number(e.target.value);
                                            setBenefitPeriod(newBenefitPeriod);
                                        }} 
                                        required 
                                        className="bg-light border border-secondary"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId={`beneStartDate-${index}`} className="mb-3">
                                    <Form.Label className="text-purple">Bene Start Date:</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        value={period.BeneStartDate} 
                                        onChange={e => {
                                            const newBenefitPeriod = [...benefitPeriod];
                                            newBenefitPeriod[index].BeneStartDate = e.target.value;
                                            setBenefitPeriod(newBenefitPeriod);
                                        }} 
                                        required
                                        placeholder="MM/DD/YYYY" 
                                        className="bg-light border border-secondary"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    ))}
                    
                </fieldset>

                <Button variant="primary" type="submit" className="w-100 mt-3">
                    Create Batched NOA
                </Button>
            </Form>
        </Card>
    </Container>
);
};