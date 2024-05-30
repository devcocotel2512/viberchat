// Routes.js
import React,{useContext,useEffect,useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Setting from '../pages/Setting';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Chat from '../pages/Chat';
import Register from '../pages/Register';
import VerifyEmail from '../pages/VerifyEmail'


function RoutesComponent() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    setLoggedIn(loggedIn);
  }, []);

  const handleLogin = async () => {
   // Set loading to true before initiating login
    try {
      // Simulate API call for login process
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a 2-second delay
      
      localStorage.setItem("loggedIn", true); // Navigate to the dashboard after successful login
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      
    }
  };

  

  return (
    
    <Routes>
      <Route path="/home"  element={<Home />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/register" element={<Register />} />
      <Route path='/verify-email' element={<VerifyEmail />} />
    </Routes>
  );
}

export default RoutesComponent;
