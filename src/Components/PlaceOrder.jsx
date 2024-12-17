import React, { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { API_HOST } from '../config/config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PAYMENT_MODES = {
    CASH: 'cash',
    ONLINE: 'online',
};

const ORDER_STATUS = {
    PENDING: 'pending',
};

const generateOrderNo = () => `ORD${Date.now()}`;

const PlaceOrder = ({ paymentMode = PAYMENT_MODES.CASH, total }) => {
    const { cart, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const activeAddress = user?.addresses?.find(address => address.active) || null;

    const [orderInfo, setOrderInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState('');
    const token = localStorage.getItem('token');

    const handleOrder = async () => {
        if (loading) return;

        if (!token) {
            alert("User is not authenticated.");
            return;
        }

        if (!orderInfo) {
            alert("Incomplete order details.");
            return;
        }

        setLoading(true);
        setLoading('Processing');

        try {
            const orderNo = await processOrder();

            if (!orderNo) {
                throw new Error("Failed to place the order.");
            }

            if (paymentMode.toLowerCase() === PAYMENT_MODES.CASH) {
                navigate('/orders');
                setLoadingStatus('Order Placed');
            } else if (paymentMode.toLowerCase() === PAYMENT_MODES.ONLINE) {
                setLoading('Fetching Order');
                const paymentResponse = await axios.post(
                    `${API_HOST}/payment/initiate`,
                    {
                        amount: orderInfo.payable_amount,
                        mobile: user.phone,
                        order_no: orderNo,
                    }
                );

                if (paymentResponse.data.paymentUrl) {
                    window.location.href = paymentResponse.data.paymentUrl;
                } else {
                    throw new Error("Payment URL not generated.");
                }
            }
        } catch (error) {
            console.error("Order processing error:", error);
            alert(error.message || "An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const processOrder = async () => {
        try {
            setLoadingStatus('Placing Order');
            const response = await axios.post(
                `${API_HOST}/order/place`,
                orderInfo,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setLoadingStatus('Order Placed');
                clearCart();
                return response.data.order.order_no;
            } else {
                setLoadingStatus('');
                throw new Error(response.data.message || "Order placement failed.");
            }
        } catch (error) {
            setLoadingStatus('');
            console.error("Error placing order:", error);
            return null;
        }
    };

    useEffect(() => {
        if (cart.length && activeAddress) {
            const items = cart.map(item => ({
                product_id: item.product.id,
                quantity: item.quantity,
                price: item.product.offer_price * item.quantity,
            }));

            setOrderInfo({
                order_no: generateOrderNo(),
                customer_address_id: activeAddress.id,
                payment_mode: paymentMode.toLowerCase(),
                payable_amount: total,
                payment_status: ORDER_STATUS.PENDING,
                transaction_id: '',
                items,
            });
        }
    }, [cart, activeAddress, paymentMode, total]);

    return (
        <button
            onClick={handleOrder}
            className="btn btn-warning btn-sm"
            disabled={loading || !orderInfo}
        >
            {loading ? (
                <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {loadingStatus}...
                </>
            ) : (
                "Place Order"
            )}
        </button>
    );
};

export default PlaceOrder;
