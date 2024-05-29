import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    
    <div className="auth-main">
      <div className="auth_div vivify fadeIn">
        <div className="auth_brand">
          <a className="navbar-brand" href="#">
            <img src="assets/images/icon.svg" width={50} className="d-inline-block align-top mr-2" alt="logo" />
            Mooli
          </a>
        </div>
        <div className="card">
          <div className="header">
            <p className="lead">Create an account</p>
          </div>
          <div className="body">
            <button className="btn btn-signin-social">
              <i className="fa fa-facebook-official facebook-color"></i> Sign in with Facebook
            </button>
            <div className="separator-linethrough">
              <span>OR</span>
            </div>
            <form className="form-auth-small">
              <div className="form-group c_form_group">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Enter your email address" />
              </div>
              <div className="form-group c_form_group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" />
              </div>
              <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
              <div className="bottom">
                <span>Already have an account? <Link to="/login">Login</Link></span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="animate_lines">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </div>
  );
};

export default Register;
