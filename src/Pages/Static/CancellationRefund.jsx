import React from 'react'
import MasterLayout from '../../Layouts/MasterLayout'

const CancellationRefund = () => {
  return (
    <MasterLayout title="Cancellation & Refund">

     <div className="Cancellation-refund-wrapper px-3 py-3">
      <h1>Cancellation & Refund Policy</h1>

      <h2>Cancellation Policy</h2>
      <p>
        An order for medicines or healthcare products can be cancelled from the ‘MY ORDER’ section on the IDOL PHARMA APP or WEBSITE (idolpharma.in) or by calling <a href="tel:7896024584">7896024584</a>. Once the order is shipped or out for delivery, orders cannot be cancelled.
      </p>
      <p>
        There may be certain orders that IDOL PHARMA cannot service and these may need to be cancelled. Some situations that may result in your order being cancelled include:
      </p>
      <ul>
        <li>Non-availability of the product or quantities ordered.</li>
        <li>Inaccuracies or errors in pricing information.</li>
      </ul>
      <p>No cancellation charges shall be levied for cancellation of an order in accordance with the terms of this policy.</p>

      <h2>Return Policy</h2>
      <p>
        If the product received is damaged, then do not accept the delivery of that product. If after opening the package, the product received is damaged, it may be returned for a refund or a replacement.
      </p>
      <p>
        We have a product-specific return policy. Some products cannot be returned. The products that are not returnable will be marked as “NON RETURNABLE.” The return window for products that can be returned ranges from 0-25 days from the date of delivery. Please check the return policy before placing any order.
      </p>
      <h3>The products shall not be eligible for a return under the following circumstances:</h3>
      <ul>
        <li>If the item has been opened, partially consumed, or damaged.</li>
        <li>If the product has been tampered with.</li>
        <li>If the product packaging and/or seal has been tampered with.</li>
        <li>If it is mentioned on the product that the item is “NON RETURNABLE.”</li>
        <li>Certain items such as sexual wellness products, diapers, and items requiring refrigeration are not returnable. These will be marked as “NON RETURNABLE” in the product section.</li>
      </ul>

      <h2>Additional Note</h2>
      <p>
        Products being returned should only be in their original manufacturer's packaging, i.e., with original price tags, labels, and invoice.
      </p>
      </div>
    </MasterLayout>

  )
}

export default CancellationRefund
