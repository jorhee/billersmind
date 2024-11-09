
/*
export default function About () {
  return (
    <section id="about" style={{ padding: '20px' }}>
      <h3>About Us</h3>
      <p>Billers Mind BPO is committed to providing top-notch business process outsourcing services.</p>
      
    </section>
  );
}*/

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaBrain, FaUsers, FaRegHandshake } from 'react-icons/fa';

export default function About()  {
  return (
    <Container className="my-5" id="about">
      <h1 className="text-center mb-4" style={{ color: '#6a0dad' }}>About Us</h1>

      {/* Mission and Vision */}
      <Row className="text-center mb-5">
        <Col md={6} className="mb-4">
          <FaBrain size={50} style={{ color: '#6a0dad' }} />
          <h3 className="mt-3">Our Mission</h3>
          <p>
            At Billers Mind BPO, our mission is to streamline and enhance business processes,
            providing tailored solutions that empower businesses to focus on growth.
          </p>
        </Col>
        <Col md={6} className="mb-4">
          <FaRegHandshake size={50} style={{ color: '#6a0dad' }} />
          <h3 className="mt-3">Our Vision</h3>
          <p>
            To be a leading BPO provider recognized for innovative, tech-driven solutions
            and unmatched client support that fosters long-term partnerships.
          </p>
        </Col>
      </Row>

      {/* Team Section */}
      <h2 className="text-center mb-4">Meet the Team</h2>
      <Row>
        {/* Example team member */}
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body className="text-center">
              <FaUsers size={50} style={{ color: '#6a0dad' }} />
              <Card.Title className="mt-3">John Doe</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">CEO & Founder</Card.Subtitle>
              <Card.Text>
                John brings over a decade of experience in the BPO industry, guiding our team with
                passion and expertise.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        {/* Repeat similar columns for other team members */}
      </Row>
    </Container>
  );
};
