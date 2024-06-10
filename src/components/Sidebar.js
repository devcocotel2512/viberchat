import React, { useEffect, useState } from 'react';
import moli from '../img/icon.svg';
import user from '../img/user-small.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState(false);

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem('loginuser');
    console.log('Retrieved userData:', userData); // Debugging log
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        console.log('Parsed userData:', parsedUserData); // Debugging log
        // Set admin status and user name
        setIsAdmin(parsedUserData.admin || false);
        setUserName(parsedUserData.un || "");
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  return (
    <div id="left-sidebar" className="sidebar">
      <div className="navbar-brand">
        <Link to="/">
          <img src={moli} alt="Mooli Logo" className="img-fluid logo" />
          <span>Mooli</span>
        </Link>
        <button type="button" className="btn-toggle-offcanvas btn btn-sm float-right">
          <i className="fa fa-close"></i>
        </button>
      </div>
      <div className="sidebar-scroll">
        <div className="user-account">
          <div className="user_div ">
            <img src={user} className="user-photo " alt="User Profile Picture" />
          </div>
          <div className="dropdown">
            <span>Web Developer,</span>
            <Link to="#" className="dropdown-toggle user-name text-decoration-none" data-toggle="dropdown">
              <strong>{userName}</strong>
            </Link>
            <ul className="dropdown-menu dropdown-menu-right account vivify flipInY ">
              <li><Link to="/login" className='text-decoration-none'><i className="fa fa-user"></i>My Profile</Link></li>
              <li><Link to="/messages" className='text-decoration-none'><i className="fa fa-envelope"></i>Messages</Link></li>
              <li><Link to="/settings" className='text-decoration-none'><i className="fa fa-gear"></i>Settings</Link></li>
              <li className="divider"></li>
              <li><Link to="/logout" className='text-decoration-none'><i className="fa fa-power-off"></i>Logout</Link></li>
            </ul>
          </div>
        </div>
        <nav id="left-sidebar-nav" className="sidebar-nav">
          <ul id="main-menu" className="metismenu animation-li-delay">
            <li className="header">Apps</li>
            <li><Link to="/chat"><i className="fa fa-comments"></i> <span>Chat</span></Link></li>
            <li><Link to="/channel"><i className="fa fa-comments"></i> <span>Channel</span></Link></li>
            {isAdmin && (
              <>
                <li><Link to="/user"><i className="fa fa-user"></i> <span>User</span></Link></li>
                <li><Link to="/task"> <i className="fa fa-tasks"></i> <span>Task</span></Link></li>
                {/* Add other admin-specific menu items here */}
              </>
            )}
           
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
