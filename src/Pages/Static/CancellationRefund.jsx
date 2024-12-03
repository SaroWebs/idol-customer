import React from 'react';
import MasterLayout from '../../Layouts/MasterLayout';
import { Helmet } from 'react-helmet-async';

const CancellationRefund = () => {
  return (
    <MasterLayout title="Cancellation &amp; Refund">
      <Helmet>
        <title>Cancellation &amp; Refund Policy - Idol Pharma</title>
        <meta
          name="description"
          content="Learn about Idol Pharma's cancellation and refund policies. Find information on order cancellations, product return policies, and eligibility for refunds."
        />
        <meta
          name="keywords"
          content="Idol Pharma, cancellation policy, refund policy, return policy, online pharmacy"
        />
      </Helmet>

      <div className="Cancellation-refund-wrapper py-5">
        <div className="text-center mb-4">
          <h1 className="fw-bold display-4">Cancellation &amp; Refund Policy</h1>
          <p className="text-muted lead">
            Understand our policies for hassle-free order cancellations and returns.
          </p>
        </div>

        <div className="content">
          <section className="mb-5">
            <h2 className="text-primary fw-bold mb-3">Cancellation Policy</h2>
            <p>
              Orders for medicines or healthcare products can be cancelled from the 
              <strong> ‘MY ORDER’</strong> section on the IDOL PHARMA app or website (<a href="https://idolpharma.in" target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-none">idolpharma.in</a>) or by calling{' '}
              <a href="tel:7896024584" className="text-primary text-decoration-none">7896024584</a>. 
              Once the order is shipped or out for delivery, cancellations will not be allowed.
            </p>
            <p>
              In some cases, IDOL PHARMA may cancel orders due to the following reasons:
            </p>
            <ul className="list-group list-group-flush mb-3">
              <li className="list-group-item">Non-availability of the product or quantities ordered.</li>
              <li className="list-group-item">Inaccuracies or errors in pricing information.</li>
            </ul>
            <p>
              No cancellation charges will be applied for cancellations made in accordance with this policy.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-primary fw-bold mb-3">Return Policy</h2>
            <p>
              If the product received is damaged, do not accept the delivery. If the damage is discovered after opening the package, you may request a return for a refund or replacement.
            </p>
            <p>
              Some products are non-returnable. Items marked as <strong>“NON RETURNABLE”</strong> are not eligible for returns. The return window for eligible products is between 0-25 days from the date of delivery. Please review the return policy before placing an order.
            </p>
            <h3 className="h5 mt-4">Products not eligible for return:</h3>
            <ul className="list-group list-group-flush mb-3">
              <li className="list-group-item">Opened, partially consumed, or damaged items.</li>
              <li className="list-group-item">Tampered products or packaging.</li>
              <li className="list-group-item">Products with broken seals.</li>
              <li className="list-group-item">Items marked as <strong>“NON RETURNABLE”</strong>.</li>
              <li className="list-group-item">
                Specific categories such as sexual wellness products, diapers, and refrigerated items (marked as <strong>“NON RETURNABLE”</strong> in the product section).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-primary fw-bold mb-3">Additional Notes</h2>
            <p>
              Products eligible for return must be in their original manufacturer’s packaging, including original price tags, labels, and invoices.
            </p>
          </section>
        </div>
      </div>
    </MasterLayout>
  );
};

export default CancellationRefund;
