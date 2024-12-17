import React, { useEffect, useState, useMemo } from 'react';
import { useCart } from '../contexts/CartContext';
import MasterLayout from '../Layouts/MasterLayout';
import { useAuth } from '../contexts/AuthContext';
import PlaceOrder from '../Components/PlaceOrder';
import PrescriptionUpload from '../Components/PrescriptionUpload';
import axios from 'axios';
import { API_HOST } from '../config/config';

const Checkout = () => {
    const { cart, updateCart, removeFromCart } = useCart();
    const { user } = useAuth();
    const [localQuantities, setLocalQuantities] = useState({});
    const [paymentMode, setPaymentMode] = useState('Cash');
    const [isLoading, setIsLoading] = useState(false);
    const [charge, setCharge] = useState(0);

    useEffect(() => {
        if (cart) {
            setLocalQuantities(cart.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {}));
        }
    }, [cart]);

    const handleChangeQuantity = (e, itemId) => {
        const newQty = parseInt(e.target.value, 10);
        if (Number.isInteger(newQty) && newQty > 0) {
            setLocalQuantities((prev) => ({ ...prev, [itemId]: newQty }));
        }
    };

    const handleBlur = (itemId) => {
        const newQty = localQuantities[itemId];
        if (newQty !== cart.find((item) => item.id === itemId).quantity) {
            updateCart(itemId, newQty);
        }
    };

    const totals = useMemo(() => {
        const total_qty = cart ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;

        const total_amount = cart
            ? cart.reduce((acc, item) => acc + (item.product.offer_price * item.quantity), 0)
            : 0;

        return { total_qty, total_amount };
    }, [cart]);


    const presc = useMemo(() => cart && cart.some((item) => item.product.prescription === 1), [cart]);
    const activeAddress = user?.addresses?.find((address) => address.active) || user?.addresses?.[0];

    useEffect(() => {
        if (activeAddress && totals.total_amount) {
            axios.post(`${API_HOST}/delivery/charge/get`, {
                pin: activeAddress.pin,
                amount: totals.total_amount
            })
                .then((res) => {
                    console.log("Delivery charge response:", res.data);
                    setCharge(res.data.charge);
                })
                .catch((err) => {
                    console.error("Error fetching delivery charge:", err.response?.data || err.message);
                });
        }
    }, [activeAddress,totals.total_amount]);


    return (
        <MasterLayout title="Checkout">
            <div className="container">
                <div className="page-header">
                    {totals.total_qty > 0 && <p>You have {totals.total_qty} items in your cart.</p>}
                </div>

                {totals.total_qty > 0 ? (
                    <div className="checkout-wrapper-area py-2">
                        <ProductReviewTable
                            cart={cart}
                            localQuantities={localQuantities}
                            handleChangeQuantity={handleChangeQuantity}
                            handleBlur={handleBlur}
                            removeFromCart={removeFromCart}
                            updateCart={updateCart}
                        />

                        <BillingInformation user={user} activeAddress={activeAddress} />
                        <PaymentMethodSelection paymentMode={paymentMode} setPaymentMode={setPaymentMode} />

                        {presc && (
                            <div className="shipping-method-choose mb-3">
                                <div className="card shipping-method-choose-card">
                                    <div className="card-body">
                                        <p>Upload prescription</p>
                                        <PrescriptionUpload type="pending" isLoading={isLoading} setIsLoading={setIsLoading} />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="card cart-amount-area">
                            <div className="card-body d-flex align-items-center justify-content-between">
                                <div className="">
                                    <h5 className="total-price mb-0">Amount : ₹ {totals.total_amount.toFixed(2)}</h5>
                                    <h5 className="total-price mb-0">Delivery Charge: ₹ {charge.toFixed(2)}</h5>
                                    <h5 className="total-price mb-0">Subtotal: ₹ {(Number(totals.total_amount) + Number(charge)).toFixed(2)}</h5>
                                </div>
                                <PlaceOrder paymentMode={paymentMode} total={(Number(totals.total_amount) + Number(charge)).toFixed(2)} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="checkout-wrapper-area py-2 text-center">
                        <span className="ps-4">No items to purchase. Please add medicine into cart and proceed.</span>
                    </div>
                )}
            </div>
        </MasterLayout>
    );
};

const ProductReviewTable = ({ cart, localQuantities, handleChangeQuantity, handleBlur, updateCart , removeFromCart }) => (
    <div className="billing-information-card mb-3">
        <div className="card billing-information-title-card bg-primary">
            <div className="card-body">
                <h6 className="text-center mb-0 text-white">Product Review</h6>
            </div>
        </div>
        <div className="card user-data-card shadow-sm">
            <div className="table-responsive card-body">
                <table className="table mb-0" id="cart">
                    <thead style={{ borderBottom: '1px solid black' }}>
                        <tr>
                            <th style={{ width: '65%' }}>Product</th>
                            <th style={{ width: '8%' }}>QTY</th>
                            <th style={{ width: '12%' }} className="text-center">Subtotal</th>
                            <th style={{ width: '10%' }}></th>
                        </tr>
                    </thead>
                    <tbody style={{ borderBottom: '1px solid black' }}>
                        {cart.map((item, i) => {
                            const subtotal = (item.product?.offer_price || 0) * item.quantity;
                            return (
                                <tr key={i} className="resjmopl-y-ljhtk">
                                    <td style={{ width: '65%' }}>
                                        <h6 style={{ fontSize: '12px' }} className="nomargin">{item.product?.name}</h6>
                                        {item.prescription && (
                                            <p>
                                                <span style={{ color: '#00b894', fontSize: '8px' }}>Prescription Required</span>
                                            </p>
                                        )}
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <button
                                                className="btn btn-danger btn-sm mx-2"
                                                onClick={() => updateCart(item.id, Math.max(1, localQuantities[item.id] - 1))}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="text"
                                                className="qty-text quantity itemQty"
                                                style={{ maxWidth: '2rem' }}
                                                value={localQuantities[item.id] || ''}
                                                onChange={(e) => handleChangeQuantity(e, item.id)}
                                                onBlur={() => handleBlur(item.id)}
                                            />
                                            <button
                                                className="btn btn-danger btn-sm mx-2"
                                                onClick={() => updateCart(item.id, localQuantities[item.id] + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="text-center">₹ {subtotal.toFixed(2)}</td>
                                    <td>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="btn btn-danger btn-sm remove-from-cart"
                                        >
                                            <i className="fa fa-trash-o"></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    </div>
);

const BillingInformation = ({ user, activeAddress }) => (
    <div className="billing-information-card mb-3">
        <div className="card billing-information-title-card bg-danger">
            <div className="card-body">
                <h6 className="text-center mb-0 text-white">Billing Information</h6>
            </div>
        </div>
        <div className="card user-data-card">
            <div className="card-body">
                {['name', 'email', 'phone'].map((field, idx) => (
                    <div key={idx} className="single-profile-data d-flex align-items-center justify-content-between">
                        <div className="title d-flex align-items-center">
                            <i className={`lni lni-${field === 'phone' ? 'phone' : field === 'name' ? 'user' : 'envelope'}`}></i>
                            <span>{field.charAt(0).toUpperCase() + field.slice(1)}</span>
                        </div>
                        <div className="data-content">{user?.[field]}</div>
                    </div>
                ))}
                <div className="single-profile-data d-flex align-items-center justify-content-between">
                    <div className="title d-flex align-items-center">
                        <i className="lni lni-map-marker"></i>
                        <span>Address</span>
                    </div>
                    <div className="data-content">{activeAddress ? `${activeAddress.address_line_1}, ${activeAddress.address_line_2}, ${activeAddress.city}, ${activeAddress.state} (${activeAddress.pin})` : 'No Active Address'}</div>
                </div>
            </div>
        </div>
    </div>
);

const PaymentMethodSelection = ({ paymentMode, setPaymentMode }) => (
    <div className="card billing-information-card mb-3">
        <div className="card billing-information-title-card bg-info">
            <div className="card-body">
                <h6 className="text-center mb-0 text-white">Payment Method</h6>
            </div>
        </div>
        <div className="card user-data-card">
            <div className="card-body">
                <select
                    className="form-select"
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                >
                    <option value="cash">Cash on Delivery</option>
                    <option value="online">Online Payment</option>
                </select>
            </div>
        </div>
    </div>
);

export default Checkout;
