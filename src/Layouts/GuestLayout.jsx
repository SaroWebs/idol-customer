import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';

const GuestLayout = ({children}) => {
    const {isAuthenticated}=useAuth();

    if (isAuthenticated) {
        return <Navigate to="/" replace />
    }
    
    return (
        <div>{children}</div>
    )
}

export default GuestLayout