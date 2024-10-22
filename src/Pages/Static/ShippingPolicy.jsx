import React from 'react'
import MasterLayout from '../../Layouts/MasterLayout'

const ShippingPolicy = () => {
  return (
    <MasterLayout title="Shipping Policy">

      <div className="Shipping-policy-wrapper px-3 py-3 bg-white">
        <h1>Shipping Policy</h1>
        <p>All orders will be processed within 48 hours, subject to stock availability.</p>
        <p>Once processed, the order will be out for delivery within 24 hours.</p>
        <p>Delivery charges will be free within Guwahati on orders above Rs. 500.</p>
        <p>For delivery outside Guwahati, delivery charges will be shown on the payment page.</p>
      </div>
    </MasterLayout>
  )
}

export default ShippingPolicy
