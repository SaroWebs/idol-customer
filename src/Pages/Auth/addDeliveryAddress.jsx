import React, { useState } from 'react';
import { Container, Card, TextInput, Textarea, Button } from '@mantine/core';
import { Link } from "react-router-dom"; // For navigation
import { useAuth } from "../../contexts/AuthContext"; // For auth context
import axios from "axios"; // For API calls
import { API_HOST } from '../../config/config';

const AddDeliveryAddress = () => {
  const { user } = useAuth(); // Access the auth context if needed
  const [formInfo, setFormInfo] = useState({
    type: 'home',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    pin: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleTypeChange = (type) => {
    setFormInfo((prevInfo) => ({
      ...prevInfo,
      type,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (!(await pinValidation(formInfo.pin))) {
      alert('Invalid PIN code');
      return;
    }
    try {
      const response = await axios.post(`${API_HOST}/deliveryaddress/store`, formInfo, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status == 200 || response.status == 201) {
        setFormInfo({
          address_line_1: '',
          address_line_2: '',
          city: '',
          state: '',
          pin: '',
          type: 'home'
        });
      } else {
        console.error('Failed to add new address:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding new address:', error);
      alert('Failed to add new address');
    }
  };

  const pinValidation = async (pin) => {
    if (!/^\d{6}$/.test(pin)) {
        return false;
    }
    try {
        const response = await axios.get(`${API_HOST}/pin/check?pin=${pin}`);
        return true;
    } catch (error) {
        console.error('Error validating PIN:', error);
        return false;
    }
}

  return (
    <Container className="py-4">
      <Card padding="lg" shadow="sm" style={{ maxWidth: 600, margin: 'auto' }}>
        <div className="flex justify-between items-center mb-4">
          <Link to="/previous-page"> {/* Adjust the link as needed */}
            <i className="text-4xl text-teal-500 fa fa-arrow-circle-left" aria-hidden="true"></i>
          </Link>
          <h2 className="text-2xl">Add New Address</h2>
        </div>

        <div className="settings-wrapper py-3">
          <form onSubmit={handleSubmit} role="form" id="contactForm" className="shake">
            <div className="card mb-3">
              <div className="card-header">Delivery Address</div>
              <div className="card-body">
                {/* Address Type Section */}
                <div className="mb-3">
                  <label className="form-label label-size">Address Type</label>
                  <div className="d-flex">
                    {['home', 'work', 'other'].map((type) => (
                      <div key={type} className="form-check me-3">
                        <input
                          type="radio"
                          id={`type-${type}`}
                          name="type"
                          value={type}
                          checked={formInfo.type === type}
                          onChange={() => handleTypeChange(type)}
                          className="form-check-input"
                        />
                        <label className="form-check-label" htmlFor={`type-${type}`}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Address Line 1 */}
                <div className="mb-1 col-12">
                  <label className="form-label label-size">Address Line 1</label>
                  <Textarea
                    name="address_line_1"
                    id="address_line_1"
                    className="form-control"
                    rows={3}
                    value={formInfo.address_line_1}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Address Line 2 */}
                <div className="mb-1 col-12">
                  <label className="form-label label-size">Address Line 2</label>
                  <Textarea
                    name="address_line_2"
                    id="address_line_2"
                    className="form-control"
                    rows={3}
                    value={formInfo.address_line_2}
                    onChange={handleInputChange}
                  />
                </div>

                {/* City */}
                <div className="mb-1 col-md-6">
                  <label className="form-label label-size">City</label>
                  <TextInput
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={formInfo.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* State */}
                <div className="mb-1 col-md-6">
                  <label className="form-label label-size">State</label>
                  <TextInput
                    type="text"
                    className="form-control"
                    id="state"
                    name="state"
                    value={formInfo.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Pincode */}
                <div className="mb-1 col-md-6">
                  <label className="form-label label-size">Pincode</label>
                  <TextInput
                    type="text"
                    className="form-control"
                    id="pin"
                    name="pin"
                    value={formInfo.pin}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="card-footer">
                <center>
                  <Button type="submit" id="addaddressorder" className="btn-danger btn-sm ms-3">Save Address</Button>
                  <Button type="button" onClick={() => handleTypeChange('select')} className="btn-secondary btn-sm ms-3">Cancel</Button>
                </center>
              </div>
            </div>
          </form>
        </div>
      </Card>
    </Container>
  );
};

export default AddDeliveryAddress;
