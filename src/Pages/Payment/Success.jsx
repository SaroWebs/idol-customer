import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MasterLayout from '../../Layouts/MasterLayout'

const Success = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/orders');
    }, [])

    return (
        <MasterLayout title="Success">
            <p>Payment Successfull</p>
        </MasterLayout>
    )
}

export default Success