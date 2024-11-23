import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaPen } from 'react-icons/fa';
import { Card, Button, Form, Container } from 'react-bootstrap';


export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Here, you can handle the form submission, like sending data to a server
  };

  return (
    <>
    <Container>
    <div className="my-5" id="contact" 
    style={{ 
      height: "80vh",
      scrollBehavior: "smooth",
      margin: 0
     }}>
      <Card className="p-4 shadow">
        <Card.Body>
          <h3 className="text-center mb-4">Contact Us</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <div className="d-flex align-items-center">
                <FaUser className="me-2" />
                <Form.Control 
                  type="text" 
                  placeholder="Enter your name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange} 
                />
              </div>
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <div className="d-flex align-items-center">
                <FaEnvelope className="me-2" />
                <Form.Control 
                  type="email" 
                  placeholder="Enter your email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange} 
                />
              </div>
            </Form.Group>

            <Form.Group controlId="formPhone" className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <div className="d-flex align-items-center">
                <FaPhone className="me-2" />
                <Form.Control 
                  type="text" 
                  placeholder="Enter your phone number" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange} 
                />
              </div>
            </Form.Group>

            <Form.Group controlId="formSubject" className="mb-3">
              <Form.Label>Subject</Form.Label>
              <div className="d-flex align-items-center">
                <FaPen className="me-2" />
                <Form.Control 
                  type="text" 
                  placeholder="Enter subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange} 
                />
              </div>
            </Form.Group>

            <Form.Group controlId="formMessage" className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={4} 
                placeholder="Enter your message" 
                name="message" 
                value={formData.message}
                onChange={handleChange} 
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
    </ Container>
    </>
  );
};
