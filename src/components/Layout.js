import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Layout({ children }) {
  return (
    <div id="body" className="theme-amethyst">
      <div className="overlay"></div>
      <div id="wrapper">
        <Sidebar />
        <div id="content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
