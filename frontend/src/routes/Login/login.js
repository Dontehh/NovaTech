import React from 'react';
import Outlook from './outlook.jpeg'; 
import './login.css'; // Import the CSS file

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>Login to your Account</h1>
                    <p>Book your session</p>
                </div>
                <div className="login-outlook">
                    <img src={Outlook} alt="Outlook logo" />
                    <p>Continue with Outlook</p>
                </div>
                <div className="login-divider">
                    <span> or Sign in with Email </span>
                </div>
                <div className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="mail@aui.ma"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="*****************"
                        />
                    </div>
                    <div className="login-options">
                        <div className="remember-me">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Remember Me</label>
                        </div>
                        <a href="/" className="forgot-password">
                            Forgot Password?
                        </a>
                    </div>
                </div>
                <button className="login-button">Login</button>
            </div>
        </div>
    );
};

export default Login;
