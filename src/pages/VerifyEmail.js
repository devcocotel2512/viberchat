import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from './services/authService';

const EmailVerification = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await authService.verifyEmail(token);
        setMessage('Email verified successfully. Redirecting to login...');
        setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
      } catch (error) {
        setMessage('Email verification failed. Please try again.');
      }
    };
    
    if (token) {
      verifyEmail();
    } else {
      setMessage('Invalid verification link.');
    }
  }, [token, navigate]);

  return (
    <div className="verification-message">
      <p>{message}</p>
    </div>
  );
};

export default EmailVerification;
