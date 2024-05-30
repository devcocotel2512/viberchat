// Sidebar.js
import React from 'react';

function Sidebar() {
    return (
       <>
       <div id="left-sidebar" className="sidebar">
       <a href="#" className="menu_toggle"><i className="fa fa-angle-left"></i></a>
       <div className="navbar-brand">
         <a href="index.html"><img src="assets/images/icon.svg" alt="Mooli Logo" className="img-fluid logo" /><span>Mooli</span></a>
         <button type="button" className="btn-toggle-offcanvas btn btn-sm float-right"><i className="fa fa-close"></i></button>
       </div>
       <div className="sidebar-scroll">
         <div className="user-account">
           <div className="user_div">
             <img src="assets/images/user.png" className="user-photo" alt="User Profile Picture" />
           </div>
           <div className="dropdown">
             <span>Web Developer,</span>
             <a href="javascript:void(0);" className="dropdown-toggle user-name" data-toggle="dropdown"><strong>Alan Green</strong></a>
             <ul className="dropdown-menu dropdown-menu-right account vivify flipInY">
               <li><a href="/login"><i className="fa fa-user"></i>My Profile</a></li>
               <li><a href="app-inbox.html"><i className="fa fa-envelope"></i>Messages</a></li>
               <li><a href="setting.html"><i className="fa fa-gear"></i>Settings</a></li>
               <li className="divider"></li>
               <li><a href="/login"><i className="fa fa-power-off"></i>Logout</a></li>
             </ul>
           </div>
         </div>
         <nav id="left-sidebar-nav" className="sidebar-nav">
           <ul id="main-menu" className="metismenu animation-li-delay">
             {/* <li className="header">Main</li>
             <li className="active"><a href="index.html"><i className="fa fa-dashboard"></i> <span>Dashboard</span></a></li> */}
             <li className="header">Apps</li>
             {/* <li><a href="app-inbox.html"><i className="fa fa-envelope"></i> <span>Email</span> <span className="badge badge-default mr-0">12</span></a></li> */}
             <li><a href="/chat"><i className="fa fa-comments"></i> <span>Chat</span></a></li>
             <li><a href="/chenel"><i className="fa fa-comments"></i> <span>Add Chennal</span></a></li>
             <li><a href="/add-user"><i className="fa fa-user"></i> <span>Add User</span></a></li>
             
           </ul>
         </nav>
       </div>
     </div>

     
     </>
    );
}

export default Sidebar;
