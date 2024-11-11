import React from 'react';
import '../css/Services.css';

export default function Services () {
return (
    <div className="services-container">
      <h1 className="services-header">Our Services</h1>
      <p className="services-description">
        Billers Mind BPO offers a comprehensive range of medical billing and quality services tailored
        for home health, hospice, and other healthcare providers. Our team ensures that your revenue
        cycle is optimized and that you maintain compliance and accuracy at every step.
      </p>

      <div className="services-item">
        <h2 className="services-item-header">1. Medical Billing & Coding</h2>
        <p className="services-item-text">
          Our expert team handles the end-to-end billing and coding process, ensuring accuracy, minimizing
          denials, and expediting reimbursements. We stay up-to-date with regulatory changes to ensure compliance.
        </p>
      </div>

      <div className="services-item">
        <h2 className="services-item-header">2. Home Health, Hospice, and Assisted Living Waiver Billing</h2>
        <p className="services-item-text">
          We provide specialized billing services for Home Health, Hospice, and Assisted Living Waiver programs,
          ensuring accurate billing for Medicare, Medicaid, and private insurance. Our experienced team understands
          the unique requirements of these care models and works diligently to maximize reimbursements while reducing
          administrative burdens.
        </p>
      </div>

      <div className="services-item">
        <h2 className="services-item-header">3. Claims Submission & Management</h2>
        <p className="services-item-text">
          We manage the entire claims lifecycle, from initial submission to follow-up and appeals, ensuring timely and
          accurate payments. Our proactive approach reduces claim denials and improves cash flow.
        </p>
      </div>

      <div className="services-item">
        <h2 className="services-item-header">4. Prior and Retro Authorizations Monitoring</h2>
        <p className="services-item-text">
          To ensure higher chances of claim approval and reimbursement, we monitor both prior and retroactive authorizations
          for each claim. Our team verifies that services are pre-approved and covered, helping to secure payment by confirming
          coverage requirements are met before and after services are rendered.
        </p>
      </div>

      <div className="services-item">
        <h2 className="services-item-header">5. Revenue Cycle Management (RCM)</h2>
        <p className="services-item-text">
          Our RCM solutions help healthcare providers enhance their financial performance by streamlining every step in
          the revenue cycle, from patient intake to final payment collection.
        </p>
      </div>

      <div className="services-item">
        <h2 className="services-item-header">6. Quality & Compliance Audits</h2>
        <p className="services-item-text">
          We conduct thorough audits to maintain compliance with industry standards, helping providers avoid costly errors
          and stay aligned with regulatory requirements.
        </p>
      </div>

      <div className="services-item">
        <h2 className="services-item-header">7. Patient Eligibility & Benefits Verification</h2>
        <p className="services-item-text">
          Our team verifies patient insurance coverage and benefits before services are rendered, reducing the risk of denied
          claims and improving the patient experience.
        </p>
      </div>

      <div className="services-item">
        <h2 className="services-item-header">8. Customized Reporting & Analytics</h2>
        <p className="services-item-text">
          Get detailed insights into your financial performance with our customized reports and analytics. We help you identify
          trends, track key performance indicators, and make informed decisions.
        </p>
      </div>
    </div>
  );
};
