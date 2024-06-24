import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
