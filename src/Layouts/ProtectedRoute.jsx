import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ element }) => {
    const { isAuthenticated, loading } = useAuth();
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

    return isAuthenticated ? element : null;
};

export default ProtectedRoute;
