// Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { setIsLoggedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiUrl = 'http://135.181.146.84:8001/login'; // Direct API URL

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('authToken', data.token); // Assuming the API returns a token
      setIsLoggedIn(true);
      window.location.href = '/home';
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="auth-main">
      <div className="auth_div vivify fadeIn">
        <div className="auth_brand">
          <a className="navbar-brand" href="/home"><img src='assets/images/icon.svg' alt="aa" width={50} className='d-inline-block align-top mr-2' />Mooli</a>
        </div>
        <div className="card">
          <div className="header">
            <p className="lead">Login to your account</p>
          </div>
          <div className="body">
            <form className="form-auth-small" onSubmit={handleSubmit}>
              <div className="form-group c_form_group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group c_form_group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group clearfix">
                <label className="fancy-checkbox element-left">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
              </div>
              <button type="submit" className="btn btn-dark btn-lg btn-block">LOGIN</button>
              <div className="bottom">
                <span className="helper-text m-b-10"><i className="fa fa-lock"></i> <a href="page-forgot-password.html">Forgot password?</a></span>
                <span>Don't have an account? <Link to="/register">Register</Link></span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="animate_lines"></div>
    </div>
  );
}

export default Login;
