import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    // Check if the user is authenticated
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            // If there's no token, redirect to login
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Clear the token
        navigate('/login'); // Redirect to the login page
    };

    return (
        <div className="dashboard-container">
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
            <h2 className="dashboard-title">Welcome to the Dashboard</h2>
            <p className="dashboard-message">
                Explore your account and manage your settings here.
            </p>
        </div>
    );
};

export default Dashboard;
