import React from 'react';

import '../css/Home.css';



export default function Home() {
  return (
    <> 
    
    <div className="home pb-0 m-0" id="home">
      <div className="home-img">
        <img src="images/bmlogo.jpg" alt="Billers Mind Logo" />
          <div className="social-icons text-center">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="bx bxl-linkedin-square"></i>
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="bx bxl-facebook-circle"></i>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <i className="bx bxl-github"></i>
            </a>
          </div>
      </div>
    
      <div className="home-content">
        <h3>Hello</h3>
        <h1>Welcome to <span>Billers Mind </span>BPO</h1>
        <h3 className="text-animation">We are a <span></span></h3>
        <p>Billers Mind is a medical billing and outsourcing service company with more than 14 years of experience. We prioritize quality and compassion while adhering to best practices. Our goal is to provide new and existing clients with resources to stay updated on current medicare and medicaid regulations. Since our founding, Billers Mind US has been known for exceptional efficiency and the highest level of professionalism.</p>
       
        <a href="/contact" className="btncontact mt-3">CONTACT US</a>
      </div>
    </div>
    
    </>
  )
};


