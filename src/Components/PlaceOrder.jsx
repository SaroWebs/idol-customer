import React, { useEffect, useState } from 'react'
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { API_HOST } from '../config/config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const generateOrderNo = () => {
    let prefix = 'ORD';
    let timestamp = Date.now().toString();
    return prefix + timestamp;
}

const PlaceOrder = ({ paymentMode = 'cash' }) => {
    const { cart, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const total_amount = cart ? cart.reduce((acc, item) => acc + (item.product.offer_price * item.quantity), 0) : 0;
    const presc = cart ? cart.some(item => item.product.prescription == 1) : false;
    const activeAddress = (user && user.addresses) ? user.addresses.find(address => address.active) : null;

    const [orderInfo, setOrderInfo] = useState({});


    const handleOrder = async () => {
        localStorage.removeItem('orderInfo');
        if (paymentMode.toLocaleLowerCase() === 'cash') {
            processOrder();
        } else if (paymentMode.toLocaleLowerCase() === 'online') {
            localStorage.setItem('orderInfo', JSON.stringify(orderInfo));
            const options = {
                method: 'post',
                url: 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay',
                headers: {
                    accept: 'text/plain',
                    ContentType: 'application/json'
                },
                data: {}
            };
            axios.request(options)
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
    }

    const processOrder = () => {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        axios.post(`${API_HOST}/order/place`, orderInfo, {
            headers: {
                'Authorization': `Bearer ${token}` // Include token in the headers
            }
        })
            .then(response => {
                console.log("Order processed successfully:", response.data); // Handle success
                clearCart();
                navigate('/orders')
            })
            .catch(error => {
                console.error("Error processing order:", error); // Handle error
            });
    }

    useEffect(() => {
        if (cart) {
            const items = cart.map(item => ({
                product_id: item.product.id,
                quantity: item.quantity,
                price: item.product.offer_price * item.quantity
            }));
            setOrderInfo({
                order_no: generateOrderNo(),
                customer_address_id: activeAddress?.id,
                payment_mode: paymentMode.toLocaleLowerCase(),
                payable_amount: total_amount,
                payment_status: 'pending',
                transaction_id: '',
                items: items
            });
        }
    }, [cart, activeAddress, paymentMode, total_amount]);

    return (
        <button onClick={handleOrder} className="btn btn-warning btn-sm">Place Order</button>
    )
}

export default PlaceOrder