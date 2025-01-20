import React from 'react';
import { Navigate } from 'react-router-dom';

// PrivateRoute: A wrapper for protected routes
const PrivateRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem('authToken'); // Check for auth token
    const role = localStorage.getItem('userRole'); // Get user role

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        // Redirect to the specific dashboard based on role
        if (role === 'Employer') {
            return <Navigate to="/employer-dashboard" replace />;
        } else if (role === 'JobSeeker') {
            return <Navigate to="/job-seeker-dashboard" replace />;
        } else {
            return <Navigate to="/dashboard" replace />;
        }
    }

    return children;
};

export default PrivateRoute;
