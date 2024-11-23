import React from 'react';
import '../css/Home.css';
import { Container } from 'react-bootstrap';
import bmlogo from '../components/images/bmlogo.jpg';



export default function Home() {
  return (
    <> 
    <Container>
    <div className="home pb-0 m-0" id="home" 
      style={{ 
        height: "80vh",
        scrollBehavior: "smooth",
        margin: 0
     }}>
      <div className="home-img">
        <img src={bmlogo} alt="Billers Mind Logo" />
          <div className="social-icons text-center">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="bx bxl-linkedin-square"></i>
            </a>
            <a href="https://www.facebook.com/billersmindbpo" target="_blank" rel="noopener noreferrer">
              <i className="bx bxl-facebook-circle"></i>
            </a>
            <a href="https://github.com/billersmind" target="_blank" rel="noopener noreferrer">
              <i className="bx bxl-github"></i>
            </a>
          </div>
          <div className="btncontact-container">
            <a href="/contact" className="btncontact mt-3">CONTACT US</a>
          </div>
      </div>
    
      <div className="home-content">
        <h3>Hello</h3>
        <h1>Welcome to <span>Billers Mind </span>BPO</h1>
        <h3 className="text-animation">We are a <span></span></h3>
        
      </div>
    </div>
    </ Container>
    </>
  )
};


