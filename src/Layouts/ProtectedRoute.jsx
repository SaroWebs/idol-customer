import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { TEST_EMAIL } from '../config/config';
const ProtectedRoute = ({ element }) => {
    const { isAuthenticated, user, loading } = useAuth();
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if (!loading?.active && !isAuthenticated) {
            const timer = setTimeout(() => {
                setShouldRedirect(true);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [loading, isAuthenticated]);

    if (loading?.active) {
        return 'Loading';
    }

    if (shouldRedirect) {
        return <Navigate to="/login" />;
    }

    if (user?.email === TEST_EMAIL && element.type.name === 'Prescriptions') {
        return <Navigate to="/" />;
    }

    return isAuthenticated ? element : null;
};

export default ProtectedRoute;
