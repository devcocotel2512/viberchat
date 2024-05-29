// Routes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Chat from '../pages/Chat';
import Register from '../pages/Register';

function RoutesComponent() {
  return (
    <Routes>
      <Route path="/"  element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default RoutesComponent;
