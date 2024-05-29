import React from 'react'
import Layout from '../components/Layout';

const Chat = () => {
  return (
    <>
    <Layout>
    <div id="main-content">
            <div className="container-fluid">
                <div className="block-header">
                    <div className="row clearfix">
                        <div className="col-xl-5 col-md-5 col-sm-12">
                            <h1>Hi, Welcomeback!</h1>
                            <span>JustDo Chat App,</span>
                        </div>            
                        <div className="col-xl-7 col-md-7 col-sm-12 text-md-right hidden-xs">
                            <div className="d-flex align-items-center justify-content-md-end mt-4 mt-md-0 flex-wrap vivify pullUp delay-550">
                                <div className="border-right pr-4 mr-4 mb-2 mb-xl-0">
                                    <p className="text-muted mb-1">Answered</p>
                                    <h5 className="mb-0">13</h5>
                                </div>
                                <div className="border-right pr-4 mr-4 mb-2 mb-xl-0">
                                    <p className="text-muted mb-1">Missed</p>
                                    <h5 className="mb-0">6</h5>
                                </div>
                                <div className="mb-3 mb-xl-0">
                                    <a href="#" className="btn btn-dark">Add New</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="chatapp_list">
                                <ul className="nav nav-tabs2 mb-4 d-flex text-center">
                                    <li className="nav-item flex-fill"><a data-toggle="tab" className="nav-link active show" href="#chats-Users">Chat</a></li>
                                    <li className="nav-item flex-fill"><a data-toggle="tab" className="nav-link" href="#chats-Groups">Groups</a></li>
                                    <li className="nav-item flex-fill"><a data-toggle="tab" className="nav-link mr-0" href="#chats-Contact">Contact</a></li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane vivify fadeIn active show" id="chats-Users">
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" placeholder="Search...">
                                            <div className="input-group-append">
                                                <span className="input-group-text"><i className="icon-magnifier"></i></span>
                                            </div>
                                        </div>
                                        <ul className="right_chat list-unstyled mb-0 animation-li-delay">
                                            <li className="online">
                                                <a href="javascript:void(0);" className="media">
                                                    <img className="media-object" src="assets/images/xs/avatar4.jpg" alt="">
                                                    <div className="media-body">
                                                        <span className="name">Louis Henry <small className="text-muted">10 min</small></span>
                                                        <span className="message">How do you do?</span>
                                                        <span className="badge badge-outline status"></span>
                                                    </div>
                                                </a>                            
                                            </li>
                                            <li className="online active">
                                                <a href="javascript:void(0);" className="media">
                                                    <img className="media-object " src="assets/images/xs/avatar5.jpg" alt="">
                                                    <div className="media-body">
                                                        <span className="name">Debra Stewart <small className="text-muted">15 min</small></span>
                                                        <span className="message">I was wondering...</span>
                                                        <span className="badge badge-outline status"></span>
                                                    </div>
                                                </a>                            
                                            </li>
                                            <li className="offline">
                                                <a href="javascript:void(0);" className="media">
                                                    <img className="media-object " src="assets/images/xs/avatar2.jpg" alt="">
                                                    <div className="media-body">
                                                        <span className="name">Lisa Garett <small className="text-muted">18 min</small></span>
                                                        <span className="message">I've forgotten how it felt before</span>
                                                        <span className="badge badge-outline status"></span>
                                                    </div>
                                                </a>                            
                                            </li>
                                            <li className="offline">
                                                <a href="javascript:void(0);" className="media">
                                                    <img className="media-object " src="assets/images/xs/avatar1.jpg" alt="">
                                                    <div className="media-body">
                                                        <span className="name">Folisise Chosielie <small className="text-muted">23 min</small></span>
                                                        <span className="message">Wasup for the third time like...</span>
                                                        <span className="badge badge-outline status"></span>
                                                    </div>
                                                </a>                            
                                            </li>
                                            <li className="online">
                                                <a href="javascript:void(0);" className="media">
                                                    <img className="media-object " src="assets/images/xs/avatar3.jpg" alt="">
                                                    <div className="media-body">
                                                        <span className="name">Marshall Nichols <small className="text-muted">27 min</small></span>
                                                        <span className="message">But we’re probably gonna need a new carpet.</span>
                                                        <span className="badge badge-outline status"></span>
                                                    </div>
                                                </a>                            
                                            </li>
                                            <li className="online">
                                                <a href="javascript:void(0);" className="media">
                                                    <img className="media-object " src="assets/images/xs/avatar5.jpg" alt="">
                                                    <div className="media-body">
                                                        <span className="name">Debra Stewart <small className="text-muted">38 min</small></span>
                                                        <span className="message">It’s not that bad...</span>
                                                        <span className="badge badge-outline status"></span>
                                                    </div>
                                                </a>                            
                                            </li>
                                            <li className="offline">
                                                <a href="javascript:void(0);" className="media">
                                                    <img className="media-object " src="assets/images/xs/avatar2.jpg" alt="">
                                                    <div className="media-body">
                                                        <span className="name">Lisa Garett <small className="text-muted">45 min</small></span>
                                                        <span className="message">How do you do?</span>
                                                        <span className="badge badge-outline status"></span>
                                                    </div>
                                                </a>                            
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="tab-pane vivify fadeIn" id="chats-Groups">
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" placeholder="Search...">
                                            <div className="input-group-append">
                                                <span className="input-group-text"><i className="icon-magnifier"></i></span>
                                            </div>
                                        </div>
                                        <ul className="right_chat list-unstyled mb-0 animation-li-delay">
                                            <li className="online">
                                                <a href="javascript:void(0);" className="media">
                                                    <img className="media-object" src="assets/images/xs/avatar4.jpg" alt="">
                                                    <div className="media-body">
                                                        <span className="name">PHP Groups<small className="text-muted">10 min</small></span>
                                                        <span className="message">How do you do?</span>
                                                        <span className="badge badge-outline status"></span>
                                                    </div>
                                                </a>                            
                                            </li>
                                            <li className="offline">
                                                <a href="javascript:void(0);" className="media">
                                                    <img className="media-object " src="assets/images/xs/avatar2.jpg" alt="">
                                                    <div className="media-body">
                                                        <span className="name">Family Groups <small className="text-muted">18 min</small></span>
                                                        <span className="message">I've forgotten how it felt before</span>
                                                        <span className="badge badge-outline status"></span>
                                                    </div>
                                                </a>                            
                                            </li>
                                            <li className="offline">
                                                <a href="javascript:void(0);" className="media">
                                                    <img className="media-object " src="assets/images/xs/avatar1.jpg" alt="">
                                                    <div className="media-body">
                                                        <span className="name">Friends holic <small className="text-muted">23 min</small></span>
                                                        <span className="message">Wasup for the third time like...</span>
                                                        <span className="badge badge-outline status"></span>
                                                    </div>
                                                </a>                            
                                            </li>
                                            <li className="offline">
                                                <a href="javascript:void(0);" className="media">
                                                    <img className="media-object " src="assets/images/xs/avatar2.jpg" alt="">
                                                    <div className="media-body">
                                                        <span className="name">CL City 2 <small className="text-muted">45 min</small></span>
                                                        <span className="message">How do you do?</span>
                                                        <span className="badge badge-outline status"></span>
                                                    </div>
                                                </a>                            
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="tab-pane vivify fadeIn" id="chats-Contact">
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" placeholder="Search...">
                                            <div className="input-group-append">
                                                <span className="input-group-text"><i className="icon-magnifier"></i></span>
                                            </div>
                                        </div>
                                        <ul className="right_chat list-unstyled mb-0 animation-li-delay">
                                            <li className="offline">
                                                <a href="javascript:void(0);" className="media">
                                                    <img className="media-object " src="assets/images/xs/avatar2.jpg" alt="">
                                                    <div className="media-body">
                                                        <span className="name">John Smith <small className="text-muted"><i className="fa fa-star"></i></small></span>
                                                        <span className="message">johnsmith@info.com</span>
                                                        <span className="badge badge-outline status"></span>
                                                    </div>
                                                </a>                            
                                            </li>
                                            <li className="online">
                                                <a href="javascript:void(0);" className="media">
                                                    <img className="media-object " src="assets/images/xs/avatar5.jpg" alt="">
                                                    <div className="media-body">
                                                        <span className="name">Debra Stewart <small className="text-muted"><i className="fa fa-star"></i></small></span>
                                                        <span className="message">It’s not that bad...</span>
                                                        <span className="badge badge-outline status"></span>
                                                    </div>
                                                </a>                            
                                            </li>
                                            <li className="offline">
                                                <a href="javascript:void(0);" className="media">
                                                    <img className="media-object " src="assets/images/xs/avatar2.jpg" alt="">
                                                    <div className="media-body">
                                                        <span className="name">Lisa Garett <small className="text-muted"><i className="fa fa-star"></i></small></span>
                                                        <span className="message">eringonzales@info.com</span>
                                                        <span className="badge badge-outline status"></span>
                                                    </div>
                                                </a>                            
                                            </li>
                                            <li className="online">
                                                <a href="javascript:void(0);" className="media">
                                                    <img className="media-object" src="assets/images/xs/avatar4.jpg" alt="">
                                                    <div className="media-body">
                                                        <span className="name">Louis Henry <small className="text-muted"><i className="fa fa-star"></i></small></span>
                                                        <span className="message">susiewillis@info.com</span>
                                                        <span className="badge badge-outline status"></span>
                                                    </div>
                                                </a>                            
                                            </li>
                                            <li className="online">
                                                <a href="javascript:void(0);" className="media">
                                                    <img className="media-object " src="assets/images/xs/avatar5.jpg" alt="">
                                                    <div className="media-body">
                                                        <span className="name">Debra Stewart <small className="text-muted"><i className="fa fa-star"></i></small></span>
                                                        <span className="message">johnsmith@info.com</span>
                                                        <span className="badge badge-outline status"></span>
                                                    </div>
                                                </a>                            
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="chatapp_body">
                                <div className="chat-header">
                                    <a href="javascript:void(0);" className="open_detail">
                                        <div className="media mb-0">
                                            <img className="rounded-circle w35" src="assets/images/user.png" alt="">
                                            <div className="media-body mr-3 ml-3 text-muted">
                                                <h6 className="m-0">Deborah Cox</h6>
                                                <small>Webdeveloper</small>
                                            </div>
                                        </div>
                                    </a>
                                    <div>
                                        <a href="javascript:void(0);" className="btn btn-sm btn-default hidden-xs"><i className="fa fa-file"></i></a>
                                        <a href="javascript:void(0);" className="btn btn-sm btn-default"><i className="fa fa-image"></i></a>
                                        <a href="javascript:void(0);" className="btn btn-sm btn-default"><i className="fa fa-video-camera"></i></a>
                                        <a href="javascript:void(0);" className="btn btn-sm btn-default"><i className="fa fa-plus"></i></a>
                                    </div>
                                </div>
                                <div className="chat-history">
                                    <ul className="message_data">
                                        <li className="right clearfix">
                                            <img className="user_pix" src="assets/images/xs/avatar7.jpg" alt="avatar">
                                            <div className="message">
                                                <a href="#" className="smily"><i className="fa fa-smile-o"></i></a>
                                                <span>Hi Aiden, how are you?<br> How is the project coming along?</span>
                                            </div>
                                            <span className="data_time">10:12 AM, Today</span>
                                        </li>
                                        <li className="left clearfix">
                                            <img className="user_pix" src="assets/images/user.png" alt="avatar">
                                            <div className="message">
                                                <a href="#" className="smily"><i className="fa fa-smile-o"></i></a>
                                                <span>Are we meeting today?</span>
                                                <div className="alert alert-primary mb-0 mt-2">
                                                    <i className="fa fa-file-word-o mr-2"></i> <span>finame12.doc</span>
                                                </div>
                                            </div>
                                            <span className="data_time">10:12 AM, Today</span>
                                        </li>
                                        <li className="right clearfix">
                                            <img className="user_pix" src="assets/images/xs/avatar5.jpg" alt="avatar">
                                            <div className="message">
                                                <a href="#" className="smily"><i className="fa fa-smile-o"></i></a>
                                                <span>How is the project coming along?</span>
                                            </div>
                                            <span className="data_time">10:12 AM, Today</span>
                                        </li>
                                        <li className="divider clearfix">
                                            <span>yesterday</span>
                                        </li>
                                        <li className="left clearfix">
                                            <img className="user_pix" src="assets/images/user.png" alt="avatar">
                                            <div className="message">
                                                <a href="#" className="smily"><i className="fa fa-smile-o"></i></a>
                                                <span>Project has been already finished and I have<br> results to show you.</span>
                                            </div>
                                            <span className="data_time">10:16 AM, Today</span>
                                        </li>
                                        <li className="right clearfix">
                                            <img className="user_pix" src="assets/images/xs/avatar5.jpg" alt="avatar">
                                            <div className="message">
                                                <a href="#" className="smily"><i className="fa fa-smile-o"></i></a>
                                                <span>How is the project coming along?</span>
                                                <div className="mt-2">
                                                    <img className="w100" src="assets/images/image-gallery/1.jpg" alt="">
                                                    <img className="w100" src="assets/images/image-gallery/2.jpg" alt="">
                                                    <img className="w100" src="assets/images/image-gallery/3.jpg" alt="">
                                                </div>
                                            </div>
                                            <span className="data_time">10:12 AM, Today</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="chat-message">
                                    <div className="form-group c_form_group mb-0">
                                        <textarea type="text" row="" className="form-control" placeholder="Enter text here..."></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="user_detail">
                                <div className="text-center mb-4">
                                    <div className="profile-image"><img src="assets/images/user.png" className="rounded-circle mb-3" alt=""></div>
                                    <h4 className="m-b-0">Louis Pierce</h4>
                                    <span>Washington, d.c.</span>
                                </div>
                                <div className="text-center">
                                    <small className="text-muted">Address: </small>
                                    <p>795 Folsom Ave, Suite 600 San Francisco, 94107</p>
                                    <small className="text-muted">Email address: </small>
                                    <p>louispierce@example.com</p>
                                    <small className="text-muted">Mobile: </small>
                                    <p>+ 202-222-2121</p>
                                    <small className="text-muted">Birth Date: </small>
                                    <p className="m-b-0">October 17th, 93</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>

    </>
  )
}

export default Chat
