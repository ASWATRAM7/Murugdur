import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
        newsletter: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if (!formData.agreeToTerms) {
            alert('Please agree to the terms and conditions');
            return;
        }

        // Add your signup logic here
        console.log('Signup submitted:', formData);
        // For now, just navigate to login
        // navigate('/login');
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-image-side">
                    <img src="/assets/signup-bg.png" alt="Luxury Fashion Atelier" />
                    <div className="auth-image-overlay"></div>
                    <div className="auth-image-content">
                        <h2>Join Murgdur</h2>
                        <p>Experience timeless luxury and exclusive access to our collections</p>
                    </div>
                </div>

                <div className="auth-form-side">
                    <div className="auth-form-container">
                        <Link to="/" className="auth-logo">
                            <div className="logo-icon">M</div>
                            <div className="logo-text">
                                <div className="logo-name">MURGDUR</div>
                                <div className="logo-tagline">Luxury Fashion House</div>
                            </div>
                        </Link>

                        <div className="auth-header">
                            <h1>Create Account</h1>
                            <p>Join our exclusive community of luxury fashion enthusiasts</p>
                        </div>

                        <form className="auth-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="John"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Doe"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your.email@example.com"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a strong password"
                                    required
                                    minLength="8"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Re-enter your password"
                                    required
                                    minLength="8"
                                />
                            </div>

                            <div className="form-checkboxes">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="agreeToTerms"
                                        checked={formData.agreeToTerms}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span>I agree to the <Link to="/terms" className="inline-link">Terms & Conditions</Link> and <Link to="/privacy" className="inline-link">Privacy Policy</Link></span>
                                </label>

                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="newsletter"
                                        checked={formData.newsletter}
                                        onChange={handleChange}
                                    />
                                    <span>Subscribe to our newsletter for exclusive updates</span>
                                </label>
                            </div>

                            <button type="submit" className="auth-submit-btn">
                                Create Account
                            </button>

                            <div className="auth-divider">
                                <span>or sign up with</span>
                            </div>

                            <div className="social-login-buttons">
                                <button type="button" className="social-btn google">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4" />
                                        <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853" />
                                        <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05" />
                                        <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335" />
                                    </svg>
                                    Google
                                </button>
                                <button type="button" className="social-btn apple">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M17.05 14.32c-.23.53-.51 1.02-.83 1.48-.44.62-.8 1.05-1.07 1.29-.42.38-.87.58-1.35.59-.35 0-.77-.1-1.26-.3-.49-.2-.94-.3-1.35-.3-.43 0-.89.1-1.38.3-.49.2-.89.31-1.19.32-.47.02-.93-.18-1.38-.6-.3-.26-.67-.71-1.13-1.35-.49-.68-.89-1.47-1.2-2.37-.33-.97-.5-1.91-.5-2.82 0-1.04.23-1.94.68-2.69.36-.59.84-1.06 1.44-1.4.6-.34 1.25-.52 1.94-.53.38 0 .88.12 1.5.35.62.23 1.02.35 1.2.35.14 0 .61-.14 1.42-.41.77-.26 1.41-.37 1.94-.33 1.43.12 2.5.69 3.21 1.73-1.28.77-1.91 1.85-1.9 3.23.01 1.08.4 1.97 1.18 2.68.35.33.75.59 1.19.77-.1.28-.2.55-.31.81zM13.33 1.86c0 .85-.31 1.64-.93 2.38-.75.87-1.65 1.37-2.63 1.29a2.65 2.65 0 01-.02-.32c0-.81.35-1.68 1-2.4.32-.36.73-.66 1.23-.9.5-.23.97-.36 1.42-.39.01.11.02.23.02.34z" />
                                    </svg>
                                    Apple
                                </button>
                            </div>
                        </form>

                        <div className="auth-footer">
                            <p>Already have an account? <Link to="/login" className="auth-link">Sign In</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
