import React from 'react';
import MasterLayout from '../../Layouts/MasterLayout';
import { Helmet } from 'react-helmet-async';

const AboutUs = () => {
  return (
    <MasterLayout title="About Us">
      <Helmet>
        <title>About Us - Idol Pharma: Online Pharmacy in Guwahati</title>
        <meta
          name="description"
          content="Learn about Idol Pharma, a trusted online pharmacy in Guwahati offering 1.5+ lakh healthcare products with up to 15% discounts. Branches at Ambari, Uzanbazar, and Chandmari."
        />
        <meta name="keywords" content="Idol Pharma, online pharmacy Guwahati, medicine store Assam, medical store northeast India" />
      </Helmet>

      <div className="about-us-wrapper py-5 px-2">
        <div className="text-center mb-4">
          <h1 className="fw-bold display-4">IDOL PHARMA</h1>
          <p className="lead text-muted">
            Trusted Online Pharmacy &amp; Medical Store in Guwahati, Assam
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <p className="mb-4">
              <strong>IDOL PHARMA</strong> is one of the most trusted medicine stores in Guwahati, Assam. Managed by two motivated entrepreneurs, we are committed to delivering 
              genuine medicines timely to your doorstep. Our vision is to provide every possible medicine at your doorstep in minimum time.
            </p>

            <div className="bg-light p-4 rounded-3 shadow-sm mb-4">
              <h2 className="h4 text-primary fw-bold mb-3">Our Branches</h2>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <strong>Ambari:</strong> G.N.B Road, Opposite AGP Office, Guwahati-781001
                </li>
                <li className="mb-2">
                  <strong>Uzanbazar:</strong> Nowjan Road, Guwahati-781001
                </li>
                <li className="mb-2">
                  <strong>Chandmari:</strong> Visit for more details
                </li>
              </ul>
            </div>

            <div className="bg-light p-4 rounded-3 shadow-sm">
              <h2 className="h4 text-primary fw-bold mb-3">Contact Us</h2>
              <p className="mb-2">
                <strong>WhatsApp or Call:</strong>{' '}
                <a href="tel:7896024584" className="text-decoration-none text-primary fw-bold">
                  7896024584
                </a>
              </p>
              <p>
                Visit our branches at Ambari, Uzanbazar, or Chandmari.
              </p>
              <p className="text-muted fst-italic">We aim to expand further across Assam.</p>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default AboutUs;
