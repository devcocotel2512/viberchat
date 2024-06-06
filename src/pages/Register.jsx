import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import moli from '../img/icon.svg'
import authService from './services/authService';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setIsSubmitting(true);
    try {
      const response = await authService.register({ username, email, password });
      // Handle successful registration (e.g., redirect to login page)
      console.log('Registration successful:', response.data);
      // Implement redirection or success message logic
      setIsSubmitting(false); // Reset loading state
      window.location.href = '/login';
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Registration failed'); // Set error message
      setIsSubmitting(false); // Reset loading state
    }
  }

  return (
    
    <div className="auth-main">
      <div className="auth_div vivify fadeIn">
        <div className="auth_brand">
          <a className="navbar-brand" href="#">
            <img src={moli} width={50} className="d-inline-block align-top mr-2" alt="logo" />
            Mooli
          </a>
        </div>
        <div className="card">
          <div className="header1">
            <p className="lead">Create an account</p>
          </div>
          <div className="body">
            {/* <button className="btn btn-signin-social">
              <i className="fa fa-facebook-official facebook-color"></i> Sign in with Facebook
            </button>
            <div className="separator-linethrough">
              <span>OR</span>
            </div> */}
            <form className="form-auth-small" onSubmit={handleSubmit}>
            <div className="form-group c_form_group">
                <label>Username</label>
                <input type="text" className="form-control" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Enter your username " />
              </div>
              <div className="form-group c_form_group">
                <label>Email</label>
                <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email address" />
              </div>
              <div className="form-group c_form_group">
                <label>Password</label>
                <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password" />
              </div>
              {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
              <button type="submit" className="btn btn-dark btn-lg bg-dark btn-block" disabled={isSubmitting}>{isSubmitting ? 'Registering...' : 'Register'}</button>
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
