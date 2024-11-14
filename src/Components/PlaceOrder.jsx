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
        if (paymentMode.toLocaleLowerCase() === 'cash') {
            processOrder('cash');
        }else if (paymentMode.toLocaleLowerCase() == 'online') {
            axios.post(`${API_HOST}/payment/initiate`, {
                amount: orderInfo.payable_amount,
                mobile: user.phone,
                order_no: orderInfo.order_no
            })
            .then(response => {
                processOrder('online')
                window.location.href = response.data.paymentUrl;
            })
            .catch(error => console.error(error));
        }
    };
    

    const processOrder = async (mode) => {
        try {
            const token = localStorage.getItem('token'); // Retrieve token from local storage
            const response = await axios.post(`${API_HOST}/order/place`, orderInfo, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if(response){
                clearCart();
                if(mode == 'online') return true;
                if(mode == 'cash') navigate('/orders');
            }
        } catch (error) {
            console.error("Error processing order:", error);
            return false;
        }
    };
    

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