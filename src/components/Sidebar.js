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
             <li><a href="/about"><i className="fa fa-comments"></i> <span>About</span></a></li>
             {/* <li><a href="app-calendar.html"><i className="fa fa-calendar"></i> <span>Calendar</span></a></li>
             <li><a href="app-todo.html"><i className="fa fa-th-list"></i> <span>Todo List</span></a></li>
             <li><a href="app-filemanager.html"><i className="fa fa-folder"></i> <span>File Manager</span></a></li>
             <li><a href="app-contacts.html"><i className="fa fa-address-book"></i> <span>Contacts</span></a></li>
             <li><a href="app-scrumboard.html"><i className="fa fa-tasks"></i> <span>Scrumboard</span></a></li>
             <li><a href="page-news.html"><i className="fa fa-globe"></i> <span>Blog</span></a></li>
             <li><a href="page-social.html"><i className="fa fa-share-alt-square"></i> <span>Social</span></a></li>
             <li className="header">Vendors</li>
             <li>
               <a href="#uiElements" className="has-arrow"><i className="fa fa-diamond"></i><span>ui Elements</span></a>
               <ul>
                 <li><a href="ui-helper-class.html">Helper Classes</a></li>
                 <li><a href="ui-bootstrap.html">Bootstrap UI</a></li>
                 <li><a href="ui-typography.html">Typography</a></li>
                 <li><a href="ui-tabs.html">Tabs</a></li>
                 <li><a href="ui-buttons.html">Buttons</a></li>
                 <li><a href="ui-icons.html">Icons</a></li>
                 <li><a href="ui-notifications.html">Notifications</a></li>
                 <li><a href="ui-colors.html">Colors</a></li>
                 <li><a href="ui-dialogs.html">Dialogs</a></li>
                 <li><a href="ui-list-group.html">List Group</a></li>
                 <li><a href="ui-media-object.html">Media Object</a></li>
                 <li><a href="ui-modals.html">Modals</a></li>
                 <li><a href="ui-nestable.html">Nestable</a></li>
                 <li><a href="ui-progressbars.html">Progress Bars</a></li>
                 <li><a href="ui-range-sliders.html">Range Sliders</a></li>
               </ul>
             </li>
             <li>
               <a href="#forms" className="has-arrow"><i className="fa fa-pencil"></i><span>Forms Elements</span></a>
               <ul>
                 <li><a href="forms-basic.html">Basic Elements</a></li>
                 <li><a href="forms-advanced.html">Advanced Elements</a></li>
                 <li><a href="forms-validation.html">Form Validation</a></li>
                 <li><a href="forms-wizard.html">Form Wizard</a></li>
                 <li><a href="forms-dragdropupload.html">Drag &amp; Drop Upload</a></li>
                 <li><a href="forms-cropping.html">Image Cropping</a></li>
                 <li><a href="forms-summernote.html">Summernote</a></li>
                 <li><a href="forms-editors.html">CKEditor</a></li>
                 <li><a href="forms-markdown.html">Markdown</a></li>
               </ul>
             </li>
             <li>
               <a href="#Tables" className="has-arrow"><i className="fa fa-table"></i><span>Tables</span></a>
               <ul>
                 <li><a href="table-normal.html">Normal Tables</a></li>
                 <li><a href="table-jquery-datatable.html">Jquery Datatables</a></li>
                 <li><a href="table-editable.html">Editable Tables</a></li>
                 <li><a href="table-color.html">Tables Color</a></li>
                 <li><a href="table-filter.html">Table Filter</a></li>
                 <li><a href="table-dragger.html">Table dragger</a></li>
               </ul>
             </li>
             <li>
               <a href="#charts" className="has-arrow"><i className="fa fa-pie-chart"></i><span>Charts</span></a>
               <ul>
                 <li><a href="chart-apex.html">Apex Charts</a></li>
                 <li><a href="chart-c3.html">C3 Charts</a></li>
                 <li><a href="chart-morris.html">Morris Chart</a></li>
                 <li><a href="chart-flot.html">Flot Chart</a></li>
                 <li><a href="chart-chartjs.html">ChartJS</a></li>
                 <li><a href="chart-jquery-knob.html">Jquery Knob</a></li>
                 <li><a href="chart-sparkline.html">Sparkline Chart</a></li>
               </ul>
             </li>
             <li className="header">More Pages</li>
             <li><a href="widgets.html"><i className="fa fa-puzzle-piece"></i><span>Widgets</span></a></li>
             <li>
               <a href="#Pages" className="has-arrow"><i className="fa fa-folder"></i><span>Pages</span></a>
               <ul>
                 <li><a href="page-login.html">Login</a></li>
                 <li><a href="page-register.html">Register</a></li>
                 <li><a href="page-forgot-password.html">Forgot Password</a></li>
                 <li><a href="page-404.html">Page 404</a></li>
                 <li><a href="page-blank.html">Blank Page</a></li>
                 <li><a href="page-search-results.html">Search Results</a></li>
                 <li><a href="page-profile.html">Profile </a></li>
                 <li><a href="page-invoices.html">Invoices </a></li>
                 <li><a href="page-gallery.html">Image Gallery </a></li>
                 <li><a href="page-timeline.html">Timeline</a></li>
                 <li><a href="page-pricing.html">Pricing</a></li>
               </ul>
             </li>
             <li><a href="map-jvectormap.html"><i className="fa fa-map"></i> <span>jVector Maps</span></a></li>
             <li className="extra_widget">
               <div className="form-group">
                 <label className="d-block">Traffic this Month <span className="float-right">77%</span></label>
                 <div className="progress progress-xxs">
                  
                 </div>
               </div>
               <div className="form-group">
                 <label className="d-block">Server Load <span className="float-right">50%</span></label>
                 <div className="progress progress-xxs">
                   
                 </div>
               </div>
             </li> */}
           </ul>
         </nav>
       </div>
     </div>

     
     </>
    );
}

export default Sidebar;
