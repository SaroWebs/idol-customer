import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MasterLayout from '../../Layouts/MasterLayout';

const PaymentFailed = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Extract query parameters from URL
    const queryParams = new URLSearchParams(location.search);
    const transactionId = queryParams.get('transactionId');
    const orderNo = queryParams.get('orderNo');

    const [countdown, setCountdown] = useState(5); // Countdown timer in seconds

    useEffect(() => {
        // Update countdown every second
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer); // Clear timer when countdown reaches 0
                    navigate('/orders'); // Redirect to orders page
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer); // Cleanup timer
    }, [navigate]);

    return (
        <MasterLayout title="Payment Failed">
            <div className="container text-center my-5 animate__animated animate__fadeIn">
                <div className="alert alert-danger" role="alert">
                    <i className="fa fa-times-circle fa-3x mb-3 text-danger"></i>
                    <h4 className="alert-heading">Payment Failed!</h4>
                    <p>
                        Unfortunately, the payment for your order 
                        <strong> #{orderNo}</strong> with transaction ID 
                        <strong> {transactionId}</strong> has failed.

                        Please pay the order amount before the order is delivered. Thank you.
                    </p>
                    <hr />
                    <p className="mb-0">
                        You will be redirected to the <strong>Orders</strong> page in{' '}
                        <span className="fw-bold text-danger">{countdown}</span> seconds.
                    </p>
                </div>
            </div>
        </MasterLayout>
    );
};

export default PaymentFailed;
