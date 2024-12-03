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
              Welcome to Idol Pharma. By using our services, you acknowledge acceptance of the practices and policies outlined in this agreement. If you disagree, please discontinue using our services.
            </p>
            <p>
              By availing of our facilities, you enter into a legally binding agreement with Idol Pharma.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-primary fw-bold">Definitions</h2>
            <p>
              "Agreement" refers to the terms and conditions, Privacy Policy, and any other documents referred to herein. “User” means anyone using the website. “Product” refers to any drugs or healthcare items listed on our site.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-primary fw-bold">Modification of Terms</h2>
            <p>
              Idol Pharma reserves the right to modify terms and conditions without prior notice. Users are expected to stay updated and comply with the latest terms.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-primary fw-bold">Prescribed Medicine Terms and Conditions</h2>
            <p>
              Prescription verification is mandatory for purchasing medicines. You must provide a valid prescription either physically or via upload. Our Retail Pharmacy will validate the prescription before dispatch.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-primary fw-bold">Payment</h2>
            <p>
              Payments can be made via credit card. Users are responsible for ensuring the accuracy of their payment details. Idol Pharma is not liable for credit card fraud.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-primary fw-bold">Pricing Information</h2>
            <p>
              Prices are displayed in Indian Rupees and are subject to Indian laws. Users are responsible for verifying prices during transactions.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-primary fw-bold">Delivery Terms</h2>
            <p>
              Idol Pharma is not liable for delivery delays. By using our services, you consent to share your address with delivery personnel.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-primary fw-bold">User Obligations</h2>
            <p>
              Users must not engage in activities that harm the company’s reputation or functionality. Harassment, abuse, and data tampering are strictly prohibited.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-primary fw-bold">Notice and Takedown</h2>
            <p>
              For any offensive or illegal content, please notify us using the contact details provided on the website.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-primary fw-bold">Disclaimer</h2>
            <p>
              Users are encouraged to consult their physician before purchasing medications. Idol Pharma is not liable for adverse effects arising from misuse of products.
            </p>
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
