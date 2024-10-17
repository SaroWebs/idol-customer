import React, { useEffect, useState } from 'react'
import { useCart } from '../contexts/CartContext'
import MasterLayout from '../Layouts/MasterLayout';
import { useAuth } from '../contexts/AuthContext';
import PlaceOrder from '../Components/PlaceOrder';
import PrescriptionUpload from '../Components/PrescriptionUpload';

const Checkout = () => {
    const { cart, updateCart, removeFromCart } = useCart();
    const { user } = useAuth();
    const [localQuantities, setLocalQuantities] = useState({});
    const [paymentMode, setPaymentMode] = useState('Cash'); 
    const [isLoading, setIsLoading]=useState(false);

    useEffect(() => {
        if (cart) {
            const initialQuantities = {};
            cart.forEach(item => {
                initialQuantities[item.id] = item.quantity;
            });
            setLocalQuantities(initialQuantities);
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

    const total_qty = cart ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;
    const total_amount = cart ? cart.reduce((acc, item) => acc + (item.product.offer_price * item.quantity), 0) : 0;
    const presc = cart ? cart.some(item => item.product.prescription == 1) : false;
    const activeAddress = (user && user.addresses) ? user.addresses.find(address => address.active) : null; // Find the active address

    return (
        <MasterLayout>
            <div className="container">
                <div className="page-header">
                    <div className="d-flex px-1">
                        <div className="back-button"></div>
                        <div>
                            <div className="title">
                                <h2>Checkout</h2>
                            </div>
                            <p>
                                {cart && total_qty > 0 ?
                                    <span>You have {total_qty} items in your cart.</span>
                                    : 'Your cart is empty !'}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="checkout-wrapper-area py-2">

                    <div className="billing-information-card mb-3">
                        <div className="card billing-information-title-card bg-primary">
                            <div className="card-body">
                                <h6 className="text-center mb-0 text-white">Product Review</h6>
                            </div>
                        </div>
                        <div className="card user-data-card">
                            <div className="cart-wrapper-area py-3">
                                <div className="cart-table card mb-3">
                                    <div className="table-responsive card-body">
                                        <table className="table mb-0">
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
                                                            <button onClick={() => removeFromCart(item.id)} className="btn btn-danger btn-sm remove-from-cart"><i className="fa fa-trash-o"></i></button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="billing-information-card mb-3">
                        <div className="card billing-information-title-card bg-danger">
                            <div className="card-body">
                                <h6 className="text-center mb-0 text-white">Billing Information</h6>
                            </div>
                        </div>
                        <div className="card user-data-card">
                            <div className="card-body">
                                <div className="single-profile-data d-flex align-items-center justify-content-between">
                                    <div className="title d-flex align-items-center"><i className="lni lni-user"></i><span>Full Name</span></div>
                                    <div className="data-content">{user?.name}</div>
                                </div>
                                <div className="single-profile-data d-flex align-items-center justify-content-between">
                                    <div className="title d-flex align-items-center"><i className="lni lni-envelope"></i>
                                        <span>Email Address</span></div>
                                    <div className="data-content">{user?.email}</div>
                                </div>
                                <div className="single-profile-data d-flex align-items-center justify-content-between">
                                    <div className="title d-flex align-items-center"><i className="lni lni-phone"></i><span>Phone</span></div>
                                    <div className="data-content">{user?.phone}</div>
                                </div>
                                {activeAddress ?
                                    <div className="single-profile-data d-flex align-items-center justify-content-between">
                                        <div className="title d-flex align-items-center"><i className="lni lni-map-marker"></i><span>Shipping Address</span></div>
                                        <div className="data-content">
                                            {activeAddress.address_line_1}, {activeAddress.address_line_2}, {activeAddress.city}, {activeAddress.state}, {activeAddress.pin}
                                        </div>
                                    </div>
                                    : null}
                            </div>
                        </div>
                    </div>

                    <div className="shipping-method-choose mb-3">
                        <div className="card shipping-method-choose-title-card bg-success">
                            <div className="card-body">
                                <h6 className="text-center mb-0 text-white">Choose Payment Method</h6>
                            </div>
                        </div>
                        <div className="card shipping-method-choose-card">
                            <div className="card-body">
                                <div className="shipping-method-choose">
                                    <ul className="ps-0">
                                        <li>
                                            <input 
                                                id="cashPayment" 
                                                type="radio" 
                                                value="Cash" 
                                                name="payment_mode" 
                                                checked={paymentMode === 'Cash'} 
                                                onChange={() => setPaymentMode('Cash')} // Update payment mode
                                            />
                                            <label htmlFor="cashPayment">Cash</label> {/* Updated label */}
                                            <div className="check"></div>
                                        </li>
                                        <li>
                                            <input 
                                                id="onlinePayment" 
                                                type="radio" 
                                                value="Online" 
                                                name="payment_mode" 
                                                checked={paymentMode === 'Online'} 
                                                onChange={() => setPaymentMode('Online')} // Update payment mode
                                            />
                                            <label htmlFor="onlinePayment">Online</label> {/* Updated label */}
                                            <div className="check"></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {presc ? (
                        <div className="shipping-method-choose mb-3">
                            <div className="card shipping-method-choose-card">
                                <div className="card-body">
                                    <div className="d-flex flex-column">
                                        <p>Upload prescription</p>
                                        <PrescriptionUpload
                                            type='pending'
                                            isLoading={isLoading}
                                            setIsLoading={setIsLoading}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}


                    <div className="card cart-amount-area">
                        <div className="card-body d-flex align-items-center justify-content-between">
                            <h5 className="total-price mb-0">₹ {total_amount.toFixed(2)}</h5>
                            <PlaceOrder paymentMode={paymentMode} /> {/* Pass payment mode to PlaceOrder */}
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    )
}

export default Checkout