import axios from 'axios';
import React, { useEffect, useState } from 'react'; // Added useState and useEffect

const OnlinePayment = () => {
    const [orderInfo, setOrderInfo] = useState(null); // Initialize orderInfo state
    const [callbackUrl, setCallbackUrl] = useState(''); // State for callback URL

    useEffect(() => {
        let oinfo = localStorage.getItem('orderInfo');
        setOrderInfo(JSON.parse(oinfo)); // Parse the orderInfo from localStorage

        const urlParams = new URLSearchParams(window.location.search);
        setCallbackUrl(urlParams.get('callbackUrl'));
    }, []);

    const handleBack = () => {
        if (callbackUrl) {
            window.location.href = callbackUrl; // Redirect to callback URL
        }
    };

    const processOrder = () => {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        axios.post(`${API_HOST}/order/place`, orderInfo, {
            headers: {
                'Authorization': `Bearer ${token}` // Include token in the headers
            }
        })
            .then(response => {
                console.log("Order processed successfully:", response.data); // Handle success
            })
            .catch(error => {
                console.error("Error processing order:", error); // Handle error
            });
    }

    return (
        <div>
            <h1>Online Payment</h1>
            {orderInfo && (
                <div>
                    <h2>Order Number: {orderInfo.order_no}</h2>
                    <p>Amount: {orderInfo.payable_amount}</p>
                    {/* Add more details as needed */}
                </div>
            )}
            <button onClick={handleBack} className="btn btn-secondary">Back</button>
        </div>
    );
}

export default OnlinePayment