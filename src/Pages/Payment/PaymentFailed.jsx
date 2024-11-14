import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const PaymentFailed = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/orders');
    }, [])

    return (
        <MasterLayout title="Failed">
            <p>Payment Failed</p>
        </MasterLayout>
    )
}

export default PaymentFailed