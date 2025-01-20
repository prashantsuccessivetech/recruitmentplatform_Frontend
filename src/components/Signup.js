
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { updateFormField, resetForm } from '../store/signupSlice';
import '../styles/Signup.css';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        name,
        email,
        password,
        role,
        contactNumber,
        skills,
        companyName,
    } = useSelector((state) => state.signup);

    const handleChange = (field, value) => {
        dispatch(updateFormField({ field, value }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        const payload = { name, email, password, role, contactNumber };
        if (role === 'JobSeeker') {
            payload.skills = skills.split(',').map((skill) => skill.trim());
        } else if (role === 'Employer') {
            payload.companyName = companyName;
        }

        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (data.message === 'Signup successful') {
                alert('User registered successfully!');
                dispatch(resetForm());
                setTimeout(() => navigate('/login'), 2000);
            } else {
                alert(data.message || 'Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="signup-container">
            <h2 className="signup-title">Create an Account</h2>
            <form className="signup-form" onSubmit={handleSignup}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contactNumber">Contact Number</label>
                    <input
                        id="contactNumber"
                        type="text"
                        placeholder="Enter your contact number"
                        value={contactNumber}
                        onChange={(e) => handleChange('contactNumber', e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => handleChange('role', e.target.value)}
                        required
                    >
                        <option value="JobSeeker">Job Seeker</option>
                        <option value="Employer">Employer</option>
                    </select>
                </div>
                {role === 'JobSeeker' && (
                    <div className="form-group">
                        <label htmlFor="skills">Skills</label>
                        <input
                            id="skills"
                            type="text"
                            placeholder="Enter skills separated by commas"
                            value={skills}
                            onChange={(e) => handleChange('skills', e.target.value)}
                            required
                        />
                    </div>
                )}
                {role === 'Employer' && (
                    <div className="form-group">
                        <label htmlFor="companyName">Company Name</label>
                        <input
                            id="companyName"
                            type="text"
                            placeholder="Enter your company name"
                            value={companyName}
                            onChange={(e) => handleChange('companyName', e.target.value)}
                            required
                        />
                    </div>
                )}
                <button className="signup-button" type="submit">
                    Sign Up
                </button>
            </form>
            <p className="login-link">
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};

export default Signup;
