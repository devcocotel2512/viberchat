// Navbar.js
import React from 'react';

function Navbar() {
    return (
        <nav className="navbar navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-left">
            <div className="navbar-btn">
              <a href="index.html"><img src="assets/images/icon.svg" alt="Mooli Logo" className="img-fluid logo" /></a>
              <button type="button" className="btn-toggle-offcanvas"><i className="fa fa-align-left"></i></button>
            </div>
            <form id="navbar-search" className="navbar-form search-form">
              <button type="button" className="btn btn-default"><i className="icon-magnifier"></i></button>
              <input value="" className="form-control" placeholder="Search here..." type="text" />
            </form>
          </div>
          <div className="navbar-right">
            <div id="navbar-menu">
              <ul className="nav navbar-nav">
                <li><a href="javascript:void(0);" className="right_note icon-menu" title="Right Menu">Notes</a></li>
                <li className="dropdown hidden-xs">
                  <a href="javascript:void(0);" className="dropdown-toggle icon-menu" data-toggle="dropdown">Create</a>
                  <div className="dropdown-menu pb-0 mt-0">
                    <a className="dropdown-item pt-2 pb-2" href="javascript:void(0);">User</a>
                    <a className="dropdown-item pt-2 pb-2" href="javascript:void(0);">Product</a>
                    <a className="dropdown-item pt-2 pb-2" href="javascript:void(0);">Category</a>
                    <a className="dropdown-item pt-2 pb-2" href="javascript:void(0);">Report</a>
                  </div>
                </li>
                <li className="dropdown hidden-xs">
                  <a href="javascript:void(0);" className="dropdown-toggle icon-menu" data-toggle="dropdown">
                    <i className="fa fa-envelope-o"></i>
                    <span className="notification-dot msg">4</span>
                  </a>
                  <ul className="dropdown-menu right_chat email mt-0 animation-li-delay">
                    <li className="header theme-bg gradient mt-0 text-light">You have 4 New eMail</li>
                    <li>
                      <a href="javascript:void(0);">
                        <div className="media">
                          <img className="media-object " src="assets/images/xs/avatar4.jpg" alt=" " />
                          <div className="media-body">
                            <span className="name">James Wert <small className="float-right font-12">Just now</small></span>
                            <span className="message">Update GitHub</span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        <div className="media">
                          <img className="media-object" src="assets/images/xs/avatar1.jpg" alt="" />
                          <div className="media-body">
                            <span className="name">Folisise Chosielie <small className="float-right font-12">12min ago</small></span>
                            <span className="message">New Messages</span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        <div className="media">
                          <img className="media-object" src="assets/images/xs/avatar5.jpg" alt="" />
                          <div className="media-body">
                            <span className="name">Louis Henry <small className="float-right font-12">38min ago</small></span>
                            <span className="message">Design bug fix</span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">
                        <div className="media mb-0">
                          <img className="media-object" src="assets/images/xs/avatar2.jpg" alt="" />
                          <div className="media-body">
                            <span className="name">Debra Stewart <small className="float-right font-12">2hr ago</small></span>
                            <span className="message">Fix Bug</span>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="dropdown">
                  <a href="javascript:void(0);" className="dropdown-toggle icon-menu" data-toggle="dropdown">
                    <i className="fa fa-bell-o"></i>
                    <span className="notification-dot info">4</span>
                  </a>
                  <ul className="dropdown-menu feeds_widget mt-0 animation-li-delay">
                    <li className="header theme-bg gradient mt-0 text-light">You have 4 New Notifications</li>
                    <li>
                      <a href="#">
                        <div className="mr-4"><i className="fa fa-check text-red"></i></div>
                        <div className="feeds-body">
                          <h4 className="title text-danger">Issue Fixed <small className="float-right text-muted font-12">9:10 AM</small></h4>
                          <small>WE have fix all Design bug with Responsive</small>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div className="mr-4"><i className="fa fa-user text-info"></i></div>
                        <div className="feeds-body">
                          <h4 className="title text-info">New User <small className="float-right text-muted font-12">9:15 AM</small></h4>
                          <small>I feel great! Thanks team</small>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div className="mr-4"><i className="fa fa-question-circle text-warning"></i></div>
                        <div className="feeds-body">
                          <h4 className="title text-warning">Server Warning <small className="float-right text-muted font-12">9:17 AM</small></h4>
                          <small>Your connection is not private</small>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div className="mr-4"><i className="fa fa-thumbs-o-up text-success"></i></div>
                        <div className="feeds-body">
                          <h4 className="title text-success">2 New Feedback <small className="float-right text-muted font-12">9:22 AM</small></h4>
                          <small>It will give a smart finishing to your site</small>
                        </div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="dropdown language-menu hidden-xs">
                  <a href="javascript:void(0);" className="dropdown-toggle icon-menu" data-toggle="dropdown"><i className="fa fa-language"></i></a>
                  <div className="dropdown-menu language_widget mt-0">
                    <a className="dropdown-item pt-2 pb-2" href="javascript:void(0);"><img src="assets/images/flag/us.svg" alt="US English" /> US English</a>
                    <a className="dropdown-item pt-2 pb-2" href="javascript:void(0);"><img src="assets/images/flag/gb.svg" alt="UK English" /> UK English</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item pt-2 pb-2" href="javascript:void(0);"><img src="assets/images/flag/russia.svg" alt="Russian" /> Russian</a>
                    <a className="dropdown-item pt-2 pb-2" href="javascript:void(0);"><img src="assets/images/flag/arabia.svg" alt="Arabic" /> Arabic</a>
                    <a className="dropdown-item pt-2 pb-2" href="javascript:void(0);"><img src="assets/images/flag/france.svg" alt="French" /> French</a>
                  </div>
                </li>
                <li><a href="javascript:void(0);" className="right_toggle icon-menu" title="Right Menu"><i className="fa fa-comments-o"></i></a></li>
                <li className="hidden-xs"><a href="javascript:void(0);" id="btnFullscreen" className="icon-menu"><i className="fa fa-arrows-alt"></i></a></li>
                <li><a href="/logout" className="icon-menu"><i className="fa fa-power-off"></i></a></li>
              </ul>
            </div>
          </div>
         
        </div>
      </nav>
    );
}

export default Navbar;
