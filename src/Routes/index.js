// Routes.js
import React,{useContext,useState} from 'react';
import { Route, Routes  } from 'react-router-dom';
import Home from '../pages/Home';
import Setting from '../pages/Setting';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Chat from '../pages/Chat';
import Register from '../pages/Register';
import Chennel from '../pages/Channel';
import AddUser from '../pages/AddUser';
import ViewChennel from '../pages/ViewChennel';



function RoutesComponent() {
  const [loggedIn, setLoggedIn] = useState(false);

  

  return (
    
    <Routes>
      <Route path="/home"  element={<Home />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/register" element={<Register />} />
      <Route path="/add-chennel" element={<Chennel />} />
      <Route path="/add-user" element={<AddUser />} />
      <Route path="/chenel" element={<ViewChennel />} />
    </Routes>
    
  );
}   

export default RoutesComponent;
