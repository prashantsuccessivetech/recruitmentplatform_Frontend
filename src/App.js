import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import EmployerDashboard from './components/employer';
import JobSeekerDashboard from './components/jobSeeker';
import PrivateRoute from '../src/privateRoute';  // Import the PrivateRoute

function App() {
    return (
        <Router>
            <Routes>
                {/* Default route redirects to Login */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected routes */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/employer-dashboard"
                    element={
                        <PrivateRoute allowedRoles={['Employer']}>
                            <EmployerDashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/job-seeker-dashboard"
                    element={
                        <PrivateRoute allowedRoles={['JobSeeker']}>
                            <JobSeekerDashboard />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
