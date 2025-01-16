import React from 'react';
import MasterLayout from '../../Layouts/MasterLayout';
import { Helmet } from 'react-helmet-async';

const Terms = () => {
  return (
    <MasterLayout title="Terms & Conditions">
      <Helmet>
        <title>Terms & Conditions - Idol Pharma</title>
        <meta 
          name="description" 
          content="Review the terms and conditions for online payments, delivery policies, and user responsibilities at Idol Pharma. Stay informed about our practices." 
        />
        <meta 
          name="keywords" 
          content="Terms and Conditions, Online Payment, Medicine Purchase, Idol Pharma Policies" 
        />
      </Helmet>

      <div className="terms-conditions-wrapper bg-light py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="fw-bold display-4 text-primary">Terms & Conditions</h1>
            <p className="text-muted lead">
              Understand our policies before using Idol Pharma's services.
            </p>
          </div>

          <section className="mb-5">
            <h2 className="text-primary fw-bold">Acceptance of Terms and Conditions</h2>
            <p>
              Welcome to Idol Pharma. By using our services, you agree to the terms outlined in this document. If you do not agree, please discontinue using our services.
            </p>
            <p>
              By availing of our services, you enter into a legally binding agreement with Idol Pharma.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-primary fw-bold">Definitions</h2>
            <p>
              "Agreement" refers to the terms and conditions, Privacy Policy, and any other documents mentioned herein. “User” refers to any individual using the website. “Product” refers to any medication or healthcare item listed on our site.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-primary fw-bold">Modification of Terms</h2>
            <p>
              Idol Pharma reserves the right to modify these terms and conditions at any time without prior notice. Users are responsible for reviewing the updated terms.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-primary fw-bold">Prescribed Medicine Terms</h2>
            <p>
              Prescription verification is mandatory for purchasing medicines. Users must provide a valid prescription either physically or via upload. Our licensed pharmacists will validate the prescription before dispatch.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-primary fw-bold">Payment</h2>
            <p>
              Payments can be made through secure channels, such as credit cards. Users are responsible for ensuring accurate payment details. Idol Pharma is not liable for unauthorized credit card transactions.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-primary fw-bold">Pricing Information</h2>
            <p>
              All prices are displayed in Indian Rupees (INR) and are compliant with Indian laws. Users should verify prices before completing transactions. Prices may be subject to change without prior notice.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-primary fw-bold">Delivery Terms</h2>
            <p>
              Idol Pharma aims to deliver orders promptly; however, delays may occur due to unforeseen circumstances. Users agree to share accurate address details for successful delivery.
            </p>
            <p>
              Idol Pharma is not liable for delays caused by external factors such as weather, strikes, or third-party delivery services.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-primary fw-bold">User Obligations</h2>
            <p>
              Users must adhere to the following obligations:
            </p>
            <ul className="list-group list-group-flush mb-3">
              <li className="list-group-item">Refrain from engaging in activities that harm Idol Pharma's reputation or disrupt operations.</li>
              <li className="list-group-item">Avoid harassment, abuse, or any unlawful activities.</li>
              <li className="list-group-item">Ensure accurate and complete information is provided during transactions.</li>
            </ul>
          </section>

          <section className="mb-5">
            <h2 className="text-primary fw-bold">Notice and Takedown</h2>
            <p>
              If you encounter offensive or illegal content on our website, please notify us immediately through the contact information provided.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-primary fw-bold">Disclaimer</h2>
            <p>
              Users are strongly advised to consult their physician before purchasing or using medications. Idol Pharma is not liable for adverse effects resulting from misuse or non-compliance with medical advice.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-primary fw-bold">Contact Information</h2>
            <p>
              For any inquiries or issues, please contact us:
            </p>
            <ul className="list-unstyled">
              <li><strong>Phone:</strong> 7896024584</li>
              <li><strong>Branches:</strong></li>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Ambari: G.N.B Road, Opposite AGP Office, Guwahati-781001</li>
                <li className="list-group-item">Uzanbazar: Nowjan Road, Guwahati-781001</li>
                <li className="list-group-item">Chandmari: Maniram Dewan Rd, Chandmari Colony, Nizarpar, Krishna Nagar, Chandmari</li>
              </ul>
            </ul>
          </section>

          <p className="text-muted fst-italic">
            *These Terms and Conditions are subject to change at the sole discretion of Idol Pharma.
          </p>
        </div>
      </div>
    </MasterLayout>
  );
};

export default Terms;
