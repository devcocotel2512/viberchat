// Routes.js
import React,{useContext,useState,useEffect} from 'react';
import { Route, Routes ,Navigate  } from 'react-router-dom';
import Home from '../pages/Home';
import Setting from '../pages/Setting';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Logout from '../pages/Logout.js';
import Chat from '../pages/Chat';
import Register from '../pages/Register';
import Channel from '../pages/Add-Channel.js';
import AddUser from '../pages/AddUser';
import ViewChennel from '../pages/ViewChennel.js';
import ViewUser from '../pages/ViewUser.js'



function RoutesComponent() {
  // const [loggedIn, setLoggedIn] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('authToken')));
  useEffect(() => {
    // Check for existing token in local storage on app load
    const token = localStorage.getItem('authToken');
    
    if (token) {
      setIsLoggedIn(true);
    }
}, []);

  return (
    
    <Routes>
      <Route path="/"  element={ isLoggedIn ? <Home /> : <Navigate to="/login" replace />} />
      {/* <Route path="/login"  element={<Login />} /> */}
      <Route path="/login"  element={ isLoggedIn ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/logout"  element={<Logout />} />
      <Route path="/register"  element={<Register />} />
      
      <Route path="/home"  element={ isLoggedIn ? <Home /> : <Navigate to="/login" replace />} />
      <Route path="/setting" element={ isLoggedIn ? <Setting /> : <Navigate to="/login" replace />} />
      <Route path="/contact" element={ isLoggedIn ? <Contact /> : <Navigate to="/login" replace />}  />
      
      <Route path="/chat" element={ isLoggedIn ? <Chat /> : <Navigate to="/login" replace />}  />
      
      <Route path="/add-channel" element={ isLoggedIn ? <Channel /> : <Navigate to="/login" replace />}  />
      <Route path="/add-user" element={ isLoggedIn ? <AddUser /> : <Navigate to="/login" replace />}  />
      <Route path="/channel"  element={ isLoggedIn ? <ViewChennel /> : <Navigate to="/login" replace />}  />
      <Route path="/user"  element={ isLoggedIn ? <ViewUser /> : <Navigate to="/login" replace />}  />

    </Routes>
    
  );
}   

export default RoutesComponent;