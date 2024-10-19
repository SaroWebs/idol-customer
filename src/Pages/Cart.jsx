import React, { useState, useEffect } from 'react'
import MasterLayout from '../Layouts/MasterLayout'
import { useCart } from '../contexts/CartContext';
import DeliveryAddressModal from '../Components/DeliveryAddressModal';
import axios from 'axios';
import { API_HOST } from '../config/config';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, updateCart, removeFromCart } = useCart();
  const [localQuantities, setLocalQuantities] = useState({});
  const [addressList, setAddressList] = useState([]);

  useEffect(() => {
    if (cart) {
      const initialQuantities = {};
      cart.forEach(item => {
        initialQuantities[item.id] = item.quantity;
      });
      setLocalQuantities(initialQuantities);
      fetchAddresses();
    }
  }, [cart]);


  const handleChangeQuantity = (e, itemId) => {
    const newQty = parseInt(e.target.value, 10);
    if (Number.isInteger(newQty) && newQty > 0) {
      setLocalQuantities(prev => ({ ...prev, [itemId]: newQty }));
    }
  }

  const handleBlur = (itemId) => {
    const newQty = localQuantities[itemId];
    if (newQty !== cart.find(item => item.id === itemId).quantity) {
      updateCart(itemId, newQty);
    }
  }

  const fetchAddresses = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${API_HOST}/deliveryaddresses`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setAddressList(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const total_qty = cart ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;
  const total_amount = cart ? cart.reduce((acc, item) => acc + (item.product.offer_price * item.quantity), 0) : 0;

  const activeAddress = addressList ? addressList.find(address => address.active) : null; // Find the active address

  return (
    <MasterLayout title="Your Cart">
      <div className="container">
        <div className='ms-4'>
          <p>
            {cart && total_qty > 0 ?
              <span>You have {total_qty} items in your cart.</span>
              : 'Your cart is empty !'}
          </p>
        </div>
        {total_qty > 0 ?
          <div className="cart-wrapper-area py-3">
            <div className="cart-table card mb-3">
              <div className="table-responsive card-body">
                <table className="table mb-0" id="cart">
                  <thead style={{ borderBottom: '1px solid black' }}>
                    <tr>
                      <th style={{ width: '65%' }}>Product</th>
                      <th style={{ width: '8%' }}>Quantity</th>
                      <th style={{ width: '12%' }} className="text-center">Subtotal</th>
                      <th style={{ width: '10%' }}></th>
                    </tr>
                  </thead>
                  <tbody style={{ borderBottom: '1px solid black' }}>
                    {cart && cart.map((item, i) => (
                      <tr key={i} className="resjmopl-y-ljhtk">
                        <td style={{ width: '65%' }}>
                          <h6 style={{ fontSize: '12px' }} className="nomargin">{item.product?.name}</h6>
                          {item.prescription ?
                            <p>
                              <span style={{ color: '#00b894', fontSize: '8px' }}>Prescription Required</span>
                            </p>
                            : null}
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="mx-2 btn btn-danger btn-sm" onClick={() => {
                              setLocalQuantities(prev => ({ ...prev, [item.id]: Math.max(1, prev[item.id] - 1) }));
                              updateCart(item.id, Math.max(1, localQuantities[item.id] - 1));
                            }}>-</span>
                            <input
                              onChange={(e) => handleChangeQuantity(e, item.id)}
                              onBlur={() => handleBlur(item.id)}
                              type="text"
                              className="qty-text quantity itemQty"
                              value={localQuantities[item.id] || ''}
                            />
                            <span className="mx-2 btn btn-danger btn-sm" onClick={() => {
                              setLocalQuantities(prev => ({ ...prev, [item.id]: prev[item.id] + 1 }));
                              updateCart(item.id, localQuantities[item.id] + 1);
                            }}>+</span>
                          </div>
                        </td>
                        <td className="text-center">₹ {item.product?.offer_price * item.quantity}</td>
                        <td>
                          <button onClick={() => removeFromCart(item.product_id)} className="btn btn-danger btn-sm remove-from-cart"><i className="fa fa-trash-o"></i></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card-body d-flex align-items-center justify-content-end">
                <h5 className="total-price mb-0 someGrandTotalPrice" style={{ fontSize: '15px', marginLeft: '-6px' }}>
                  Total amount: ₹ {total_amount.toFixed(2)}
                </h5>
              </div>
              {activeAddress ? // Check if there is an active address
                <>
                  <div className="card-body d-flex align-items-center justify-content-between border shadow">
                    <div className="w-100">
                      <div className="d-flex justify-content-between">
                        <h6>Delivery Address:</h6>

                        <DeliveryAddressModal
                          text={"Change Address"}
                          type={"select"}
                          addressList={addressList}
                          setAddressList={setAddressList}
                          fetchAddresses={fetchAddresses}
                        />

                      </div>
                      <p>
                        {activeAddress.address_line_1}, {activeAddress.address_line_2}, {activeAddress.city}, {activeAddress.state}, {activeAddress.pin}
                      </p>
                    </div>
                  </div>
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <Link to="/" className="btn btn-success btn-sm">Add More Medicines</Link>
                    <Link to="/checkout" className="btn btn-warning btn-sm">Checkout</Link>
                  </div>
                </>
                :
                <div className="card-body d-flex align-items-center justify-content-between">
                  <Link to="/" className="btn btn-success btn-sm">Add More Medicines</Link>
                  {addressList && addressList ?
                    <DeliveryAddressModal text={"Select Address"} type={"select"} addressList={addressList} setAddressList={setAddressList} fetchAddresses={fetchAddresses} />
                    :
                    <DeliveryAddressModal text={"Add Delivery Address"} type={"add"} addressList={addressList} setAddressList={setAddressList} fetchAddresses={fetchAddresses} />
                  }
                </div>
              }
            </div>
          </div>
          : null}
      </div>
    </MasterLayout>
  )
}

export default Cart

