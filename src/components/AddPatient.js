import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function AddPatient() {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [cbsaCode, setCbsaCode] = useState('');
  const [memberId, setMemberId] = useState('');
  const [providerId, setProviderId] = useState('');
  const [providers, setProviders] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:4000/providers/all', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setProviders(data.providers || []); // Use an empty array if data.providers is undefined
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching providers:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (lastName && firstName && dateOfBirth && gender && memberId && providerId) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [lastName, firstName, dateOfBirth, gender, memberId, providerId]);

  function registerPatient(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');

    fetch('http://localhost:4000/patients/add-patient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        lastName: lastName.toUpperCase(),
        firstName: firstName.toUpperCase(),
        dateOfBirth,
        gender,
        address: {
          Address: address.toUpperCase(),
          City: city.toUpperCase(),
          State: state.toUpperCase(),
          Zip: zip
        },
        cbsaCode,
        memberId: memberId.toUpperCase(),
        providerId
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Patient registered successfully') {
          alert('Patient successfully added');
          navigate(`/providers/${providerId}`);
        } else {
          alert(data.message);
        }
      });
  }

  return (
    <div className="text-auto">
      <Button variant="secondary" className="mt-3" onClick={() => navigate(`/providers/${providerId}`)}>
        Back to Provider Dashboard
      </Button>
      <Form onSubmit={registerPatient}>
        <h1 className="my-5 text-center">Register New Patient</h1>

        <Form.Group>
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Date of Birth:</Form.Label>
          <Form.Control
            type="text"
            placeholder="MM-DD-YYYY"
            required
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
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

        <Form.Group>
          <Form.Label>Address:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group>
          <Form.Label>City:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group>
          <Form.Label>State:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group>
          <Form.Label>Zip Code:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Zip Code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group>
          <Form.Label>CBSA Code:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter CBSA Code"
            value={cbsaCode}
            onChange={(e) => setCbsaCode(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group>
          <Form.Label>Member ID:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Member ID"
            required
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Provider ID:</Form.Label>
          {loading ? (
            <p>Loading providers...</p>
          ) : (
            <Form.Control
              as="select"
              required
              value={providerId}
              onChange={(e) => setProviderId(e.target.value)}
            >
              <option value="">Select Provider</option>
              {providers.map((provider) => (
                <option key={provider._id} value={provider._id}>
                  {provider.name}
                </option>
              ))}
            </Form.Control>
          )}
        </Form.Group>

        <div className="text-center mt-4">
          <Button variant={isActive ? "primary" : "danger"} type="submit" disabled={!isActive}>
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
}