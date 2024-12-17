import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MasterLayout from '../../Layouts/MasterLayout';

const Success = () => {
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
        <MasterLayout title="Payment Success">
            <div className="container text-center my-5 animate__animated animate__fadeIn">
                <div className="alert alert-success" role="alert">
                    <i className="fa fa-check-circle fa-3x mb-3 text-success"></i>
                    <h4 className="alert-heading">Payment Successful!</h4>
                    <p>
                        Your payment for order 
                        <strong> #{orderNo}</strong> with transaction ID 
                        <strong> {transactionId}</strong> has been successfully processed.  Thank you.
                    </p>
                    <hr />
                    <p className="mb-0">
                        You will be redirected to the <strong>Orders</strong> page in{' '}
                        <span className="fw-bold text-success">{countdown}</span> seconds.
                    </p>
                </div>
            </div>
        </MasterLayout>
    );
};

export default Success;
