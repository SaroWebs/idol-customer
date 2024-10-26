import React from 'react'
import MasterLayout from '../../Layouts/MasterLayout'

const AboutUs = () => {
  return (
    <MasterLayout title="About Us">

     <div className="Contact-us-wrapper p-3">
      <h1>About IDOL PHARMA</h1>
      <p>IDOL PHARMA is one of the most trusted medicine stores in Guwahati, Assam. It is managed by two motivated entrepreneurs from Guwahati.</p>
      
      <p>We deliver genuine medicines timely at your doorstep. Our vision is to deliver every possible medicine at your doorstep in the minimum time.</p>
      
      <h2>Branches</h2>
      <ul>
        <li>G.N.B Road, Ambari, Opposite AGP Office, Guwahati-781001</li>
        <li>Nowjan Road, Uzanbazar, Guwahati-781001</li>
      </ul>
      
      <h2>Contact</h2>
      <p>
        Whatsapp or Call: <a href="tel:7896024584">7896024584</a><br />
        Visit our branches at: Ambari, Uzanbazar, Chandmari
      </p>
      
      <p>We look to expand further in Assam.</p>
      </div>
    </MasterLayout>
  )
}

export default AboutUs
