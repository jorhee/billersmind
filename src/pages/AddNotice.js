import React, { useEffect, useState, useCallback } from 'react';
import { Button, Form } from 'react-bootstrap';

	const AddNotice = ({ providerId }) => {
    const [patients, setPatients] = useState([]);
    const [selectedPatients, setSelectedPatients] = useState([]);
    const [formData, setFormData] = useState({
        placeOfService: '',
        payerId: '',
        memberId: '',
        admitDate: '',
        typeOfBill: '',
        primaryDiagnosis: '',
        AttMd: { firstName: '', lastName: '', npi: '' }
    });

    // Fetch patients for the specified provider using useCallback
    const fetchPatients = useCallback(async () => {
        const response = await fetch(`http://localhost:4000/patients?providerId=${providerId}`);
        const data = await response.json();
        setPatients(data);
    }, [providerId]); // Adding providerId to the dependency array

    useEffect(() => {
        fetchPatients();
    }, [fetchPatients]); // Add fetchPatients to the dependency array

    const handleCheckboxChange = (patientId) => {
        setSelectedPatients(prev =>
            prev.includes(patientId)
                ? prev.filter(id => id !== patientId) // Unselect if already selected
                : [...prev, patientId] // Select if not already selected
        );
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:4000/notices/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include token if needed
                },
                body: JSON.stringify({
                    patientIds: selectedPatients,
                    providerId,
                    ...formData
                })
            });

            const result = await response.json();
            if (response.ok) {
                console.log('Notices added:', result);
                // Optionally reset selected patients and form data here
                setSelectedPatients([]);
                setFormData({
                    placeOfService: '',
                    payerId: '',
                    memberId: '',
                    admitDate: '',
                    typeOfBill: '',
                    primaryDiagnosis: '',
                    AttMd: { firstName: '', lastName: '', npi: '' }
                });
            } else {
                console.error('Error adding notices:', result);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div>
            <h2>Select Patients to Add Notice</h2>
            <Form onSubmit={handleSubmit}>
                <ul>
                    {patients.map(patient => (
                        <li key={patient._id}>
                            <Form.Check
                                type="checkbox"
                                label={`${patient.firstName} ${patient.lastName}`}
                                checked={selectedPatients.includes(patient._id)}
                                onChange={() => handleCheckboxChange(patient._id)}
                            />
                        </li>
                    ))}
                </ul>
                <Form.Group controlId="formPlaceOfService">
                    <Form.Label>Place of Service</Form.Label>
                    <Form.Control
                        type="text"
                        name="placeOfService"
                        value={formData.placeOfService}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formPayerId">
                    <Form.Label>Payer ID</Form.Label>
                    <Form.Control
                        type="text"
                        name="payerId"
                        value={formData.payerId}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formMemberId">
                    <Form.Label>Member ID</Form.Label>
                    <Form.Control
                        type="text"
                        name="memberId"
                        value={formData.memberId}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formAdmitDate">
                    <Form.Label>Admit Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="admitDate"
                        value={formData.admitDate}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formTypeOfBill">
                    <Form.Label>Type of Bill</Form.Label>
                    <Form.Control
                        as="select"
                        name="typeOfBill"
                        value={formData.typeOfBill}
                        onChange={handleChange}
                    >
                        <option value="">Select Type</option>
                        <option value="81A">81A</option>
                        <option value="81C">81C</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formPrimaryDiagnosis">
                    <Form.Label>Primary Diagnosis</Form.Label>
                    <Form.Control
                        type="text"
                        name="primaryDiagnosis"
                        value={formData.primaryDiagnosis}
                        onChange={handleChange}
                    />
                </Form.Group>
                <h3>Attending Physician</h3>
                <Form.Group controlId="formAttMdFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="AttMd.firstName"
                        value={formData.AttMd.firstName}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formAttMdLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="AttMd.lastName"
                        value={formData.AttMd.lastName}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formAttMdNPI">
                    <Form.Label>NPI</Form.Label>
                    <Form.Control
                        type="text"
                        name="AttMd.npi"
                        value={formData.AttMd.npi}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Notice
                </Button>
            </Form>
        </div>
    );
};

export default AddNotice;
