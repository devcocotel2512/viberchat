import React from 'react';
import moli from '../img/icon.svg';
import user from '../img/user-small.png';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <>
      <div id="left-sidebar" className="sidebar">
        <Link to="#" className="menu_toggle"><i className="fa fa-angle-left"></i></Link>
        <div className="navbar-brand">
          <Link to="/">
            <img src={moli} alt="Mooli Logo" className="img-fluid logo" />
            <span>Mooli</span>
          </Link>
          <button type="button" className="btn-toggle-offcanvas btn btn-sm float-right"><i className="fa fa-close"></i></button>
        </div>
        <div className="sidebar-scroll">
          <div className="user-account">
            <div className="user_div">
              <img src={user} className="user-photo" alt="User Profile Picture" />
            </div>
            <div className="dropdown">
              <span>Web Developer,</span>
              <Link to="#" className="dropdown-toggle user-name" data-toggle="dropdown"><strong>Alan Green</strong></Link>
              <ul className="dropdown-menu dropdown-menu-right account vivify flipInY">
                <li><Link to="/login"><i className="fa fa-user"></i>My Profile</Link></li>
                <li><Link to="/messages"><i className="fa fa-envelope"></i>Messages</Link></li>  {/* Assuming messages route is at /messages */}
                <li><Link to="/settings"><i className="fa fa-gear"></i>Settings</Link></li>
                <li className="divider"></li>
                <li><Link to="/logout"><i className="fa fa-power-off"></i>Logout</Link></li>
              </ul>
            </div>
          </div>
          <nav id="left-sidebar-nav" className="sidebar-nav">
            <ul id="main-menu" className="metismenu animation-li-delay">
              {/* <li className="header">Main</li>
              <li className="active"><Link to="/"><i className="fa fa-dashboard"></i> <span>Dashboard</span></Link></li> */}  {/* Assuming dashboard route is at / */}
              <li className="header mr-180">Apps</li>
              {/* <li><Link to="app-inbox.html"><i className="fa fa-envelope"></i> <span>Email</span> <span className="badge badge-default mr-0">12</span></a></li> */}  {/* Remove this as it's an external HTML file */}
              <li><Link to="/chat"><i className="fa fa-comments"></i> <span>Chat</span></Link></li>
              <li><Link to="/channel"><i className="fa fa-comments"></i> <span> Channel</span></Link></li>
              <li><Link to="/user"><i className="fa fa-user"></i> <span>User</span></Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
