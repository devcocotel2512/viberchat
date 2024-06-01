import React from "react";
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Layout({ children }) {
  return (
    
      <div id="body" className="theme-amethyst">
        <div className="overlay"></div>

        <div id="wrapper">
          <Navbar />

          <Sidebar />

         
        </div>
        {children}
      </div>
    
  );
}

export default Layout;
