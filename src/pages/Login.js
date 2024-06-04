import React, { useState, useContext } from 'react';
// import { AuthContext } from './AuthContext';
import moli from '../img/icon.svg'
import { Link,useNavigate  } from 'react-router-dom';
import authService from './services/authService';
// import { AuthContext } from '../context/AuthContext.js';
const Login = () => {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate  = useNavigate ();

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('authToken'));
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
   
    try {
      const response = await authService.login({ email, password });



      if (response.status !== 200) {
        
        throw new Error('Login failed');
      }
      else{
       
      const data = await response.data;
      
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('loginuser', data.user);
      

      setIsLoggedIn(true);
      navigate('/');
      window.location.href = '/';
      }
      // window.location.href = '/';
    } catch (error) {
      console.log('error',error);
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="auth-main">
      <div className="auth_div vivify fadeIn">
        <div className="auth_brand">
          <a className="navbar-brand" href="/home"><img src={moli} alt="aa" width={50} className='d-inline-block align-top mr-2' />Mooli</a>
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
              <button type="submit" className="btn btn-dark btn-lg btn-block bg-dark">LOGIN</button>
              <div className="bottom">
                <span className="helper-text m-b-10"><i className="fa fa-lock"></i> <a href="page-forgot-password.html">Forgot password?</a></span>
                <span>Don't have an account? <Link to="/register">Register</Link></span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="animate_lines"></div>
      <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
    </div>
  );
}

export default Login;
