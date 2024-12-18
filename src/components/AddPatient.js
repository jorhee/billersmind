import React from 'react';

import { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddPatient() {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [memberId, setMemberId] = useState('');
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();
  const { providerId } = useParams(); // Get providerId from the route parameters

  useEffect(() => {
    setIsActive(lastName && firstName && dateOfBirth && gender && memberId);
  }, [lastName, firstName, dateOfBirth, gender, memberId]);

  async function registerPatient(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${process.env.REACT_APP_BE_URL}/patients/${providerId}/add-patient`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          lastName: lastName.toUpperCase(),
          firstName: firstName.toUpperCase(),
          dateOfBirth, // Send as is, validate in backend
          gender,
          address: {
            Address: address.toUpperCase(),
            City: city.toUpperCase(),
            State: state.toUpperCase(),
            Zip: zip,
          },
          memberId: memberId.toUpperCase(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Patient successfully added');
        navigate(`/providers/${providerId}`);
      } else {
        alert(data.message || 'Error adding patient');
      }
    } catch (error) {
      console.error('Error registering patient:', error);
      alert('An error occurred. Please try again.');
    }
  }

  return (
    <Container className="d-flex">
    
    <div className="text-purple bg-secondary px-5 w-100 p-5">
    <div className="w-100">
      <Button variant="secondary" className="mt-3" onClick={() => navigate(`/providers/${providerId}`)}>
        Back to Provider Dashboard
      </Button>
      <Form onSubmit={registerPatient}>
        <h1 className="my-5 text-center">Register New Patient</h1>

        <Form.Group className="d-inline-block me-3">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="d-inline-block me-3">
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="d-inline-block me-3">
          <Form.Label>Date of Birth:</Form.Label>
          <Form.Control
            type="text"
            placeholder="MM/DD/YYYY"
            required
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="d-inline-block me-3">
          <Form.Label>Gender:</Form.Label>
          <Form.Control
            as="select"
            required
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="U">Unknown</option>
          </Form.Control>
        </Form.Group>
        <br/>
        <Form.Group className="d-inline-block me-3 w-50">
          <Form.Label>Address:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group className="d-inline-block me-3">
          <Form.Label>City:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group className="d-inline-block me-3">
          <Form.Label>State:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group className="d-inline-block me-3">
          <Form.Label>Zip Code:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Zip Code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group className="d-block w-25">
          <Form.Label>Member ID:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Member ID"
            required
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
          />
        </Form.Group>


        <div className="text-center mt-4">
          <Button variant={isActive ? "primary" : "danger"} type="submit" disabled={!isActive}>
            Register
          </Button>
        </div>
      </Form>
      </div>
    </div>
    
    </ Container>
  );
}