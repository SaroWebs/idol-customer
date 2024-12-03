import React from 'react';
import MasterLayout from '../../Layouts/MasterLayout';
import { Helmet } from 'react-helmet-async';

const ShippingPolicy = () => {
  return (
    <MasterLayout title="Shipping Policy">
      <Helmet>
        <title>Shipping Policy - Idol Pharma</title>
        <meta 
          name="description" 
          content="Learn about Idol Pharma's shipping policies, delivery timelines, and charges for orders placed in Guwahati and beyond." 
        />
        <meta 
          name="keywords" 
          content="Shipping Policy, Delivery Policy, Free Delivery, Idol Pharma" 
        />
      </Helmet>

      <div className="shipping-policy-wrapper bg-light py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="fw-bold display-4 text-primary">Shipping Policy</h1>
            <p className="text-muted lead">
              Quick and reliable delivery, ensuring you receive your products on time.
            </p>
          </div>

          <section className="mb-5">
            <h2 className="text-primary fw-bold">Order Processing</h2>
            <p>
              All orders are processed within <strong>48 hours</strong>, subject to stock availability. Once processed, your order will be dispatched for delivery within <strong>24 hours</strong>.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-primary fw-bold">Delivery Charges</h2>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Free delivery</strong> within Guwahati on orders above <strong>₹1000</strong>.
              </li>
              <li className="list-group-item">
                Delivery charges for orders outside Guwahati will be calculated and displayed at the payment page.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-primary fw-bold">Need Assistance?</h2>
            <p>
              For any questions about our shipping policy, feel free to contact us at{' '}
              <a href="tel:7896024584" className="text-primary text-decoration-none">
                7896024584
              </a>.
            </p>
          </section>
        </div>
      </div>
    </MasterLayout>
  );
};

export default ShippingPolicy;
