import React from 'react';
import MasterLayout from '../../Layouts/MasterLayout';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  return (
    <MasterLayout title="Privacy Policy">
      <Helmet>
        <title>Privacy Policy - Idol Pharma</title>
        <meta
          name="description"
          content="Learn how Idol Pharma collects, uses, and protects your information in accordance with our Privacy Policy. Your privacy is our priority."
        />
        <meta
          name="keywords"
          content="Privacy Policy, Data Collection, Data Security, Personal Information, Idol Pharma"
        />
      </Helmet>

      <div className="privacy-policy-wrapper bg-light py-5 px-3">
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="fw-bold display-4 text-primary">Privacy Policy</h1>
            <p className="text-muted lead">
              Your privacy is our priority. Learn how we handle your data securely and responsibly.
            </p>
          </div>

          <p className="mb-5">
            By using or accessing the service in any manner, you acknowledge that you accept the practices and policies outlined in this Privacy Policy, and you hereby consent to our collection, use, and sharing of your information as described below.
          </p>

          <section className="mb-5">
            <h2 className="text-primary fw-bold">What Data We Collect and Why</h2>
            <p>
              Like most websites, we gather certain information (e.g., mobile provider, operating system) automatically and store it in log files. This information, which does not identify individual users, is used to:
            </p>
            <ul className="list-group list-group-flush mb-3">
              <li className="list-group-item">Analyze trends and administer the website.</li>
              <li className="list-group-item">Track user movement on the website.</li>
              <li className="list-group-item">Gather demographic information about our user base.</li>
            </ul>
            <p>
              In some cases, this data may be linked to Personally Identifiable Information to provide a more personalized experience.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-primary fw-bold">Personally Identifiable Information</h2>
            <p>
              When registering on our website, we may ask for information such as your name, email, billing address, and payment details. You can review and update this information in your profile. If you delete your data, your account may be cancelled. However, we may retain archived records as required by law.
            </p>
            <p>
              Certain Personally Identifiable Information may be shared with trusted third-party intermediaries to assist in providing our services. These third parties are restricted from using this data for any purpose other than assisting us.
            </p>
            <p>
              We do not rent or sell Personally Identifiable Information to third parties.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-primary fw-bold">Use of Information</h2>
            <p>
              We use personal information to:
            </p>
            <ul className="list-group list-group-flush mb-3">
              <li className="list-group-item">Provide our services to clients.</li>
              <li className="list-group-item">Contact clients about account activities, updates, or offers.</li>
              <li className="list-group-item">Respond to inquiries or feedback.</li>
            </ul>
            <p>
              If you wish to stop receiving communications from us, email us at{' '}
              <a href="mailto:youremail@example.com" className="text-primary text-decoration-none">youremail@example.com</a>.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-primary fw-bold">Storage and Security of Information</h2>
            <p>
              We operate secure data networks protected by industry-standard firewalls and password protection systems. Only authorized personnel have access to client information. Our security policies are reviewed and enhanced periodically to ensure data safety.
            </p>
          </section>
        </div>
      </div>
    </MasterLayout>
  );
};

export default PrivacyPolicy;
