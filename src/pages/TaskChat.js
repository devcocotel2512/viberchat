import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import chatService from "./services/chatService";
import Layout from "../components/Layout";
import "../Css/TaskFormModal.css";

const TaskChat = () => {
  const { id } = useParams();
  const retrievedUser = JSON.parse(localStorage.getItem("loginuser"));
  const retrievedId = localStorage.getItem("loginId");
  
  const [loggedInUser, setLoggedInUser] = useState(retrievedUser || {});  
  const [loggedInId, setLoggedInId] = useState(retrievedId || ''); 
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await chatService.getData({
          searchqurey: {
          _id:loggedInId,

          },
          projection: {
            chat: 1,
          },
          showcount: 1,
        });
        // setTasks(response.data.data[0].task||[]);
      } catch (error) {
        console.log("error fatching task", error);
      }
    };
    fetchTask();
  }, [id]); 
  return (
    <Layout>
      <div id="main-content">
        <div className="container-fluid">
          <div className="row clearfix mb-2">
            <div className="col-xl-5 col-md-5 col-sm-12"></div>
            <div className="col-xl-7 col-md-7 col-sm-12 text-md-right hidden-xs"></div>
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-md-12">
            <div className="card">
              <div className="header d-flex justify-content-between align-items-center">
                <h2>Task Chating</h2>
                <div action="" className="search-bar">
                  <input type="search" placeholder="Search Here..." />
                  <button className="search-btn" type="submit">
                    <span>Search</span>
                  </button>
                </div>
              </div>
              {/* <div className="ml-3">
                <p>Chat-id={id}</p>
              </div> */}

              <div className="aa-chatapp_body">
                <div className="chat-header">
                  <Link
                    to="javascript:void(0);"
                    className="open_detail text-decoration-none"
                  >
                    <hr className="line-11" />
                    <div className="media mb-1 mt-2">
                      <img
                        className="rounded-circle w35"
                        src="/assets/images/user.png"
                        alt=""
                      />
                      <div className="media-body mr-3 ml-3 text-muted">
                        <h6 className="m-0">Deborah Cox</h6>
                        <small>Webdeveloper</small>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="chat-history" style={{ maxHeight: "400px", overflowY: "auto" }}>
                  <div className="container">
                    <ul className="message_data">
                    <li className="right clearfix">
                        <img
                          className="user_pix"
                          src="/assets/images/xs/avatar7.jpg"
                          alt="avatar"
                        />
                        <div className="message">
                          <Link to="" className="smily">
                            <i className="fa fa-smile-o"></i>
                          </Link>
                          <span>
                            Hi Aiden, how are you? How is the project coming
                            along?
                          </span>
                        </div>
                        <span className="data_time">10:12 AM, Today</span>
                      </li>
                      <li className="left clearfix">
                        <img
                          className="user_pix"
                          src="/assets/images/user.png"
                          alt="avatar"
                        />
                        <div className="message">
                          <Link to="" className="smily">
                            <i className="fa fa-smile-o"></i>
                          </Link>
                          <span>Are we meeting today?</span>
                          <div className="alert alert-primary mb-0 mt-2">
                            <i className="fa fa-file-word-o mr-2"></i>{" "}
                            <span>finame12.doc</span>
                          </div>
                        </div>
                        <span className="data_time">10:12 AM, Today</span>
                      </li>
                      <li className="right clearfix">
                        <img
                          className="user_pix"
                          src="/assets/images/xs/avatar5.jpg"
                          alt="avatar"
                        />
                        <div className="message">
                          <Link to="#" className="smily">
                            <i className="fa fa-smile-o"></i>
                          </Link>
                          <span>How is the project coming along?</span>
                        </div>
                        <span className="data_time">10:12 AM, Today</span>
                      </li>
                      <li className="divider clearfix">
                        <span>yesterday</span>
                      </li>

                      <li className="right clearfix">
                        <img
                          className="user_pix"
                          src="/assets/images/xs/avatar5.jpg"
                          alt="avatar"
                        />
                        <div className="message">
                          <Link to="#" className="smily">
                            <i className="fa fa-smile-o"></i>
                          </Link>
                          <span>How is the project coming along?</span>
                        </div>
                        <span className="data_time">10:12 AM, Today</span>
                      </li>

                      <li className="left clearfix">
                        <img
                          className="user_pix"
                          src="/assets/images/user.png"
                          alt="avatar"
                        />
                        <div className="message">
                          <Link to="" className="smily">
                            <i className="fa fa-smile-o"></i>
                          </Link>
                          <span>Are we meeting today?</span>
                          <div className="alert alert-primary mb-0 mt-2">
                            <i className="fa fa-file-word-o mr-2"></i>{" "}
                            <span>finame12.doc</span>
                          </div>
                        </div>
                        <span className="data_time">10:12 AM, Today</span>
                      </li>
                      <li className="left clearfix">
                        <img
                          className="user_pix"
                          src="/assets/images/user.png"
                          alt="avatar"
                        />
                        <div className="message">
                          <Link to="" className="smily">
                            <i className="fa fa-smile-o"></i>
                          </Link>
                          <span>Are we meeting today?</span>
                          <div className="alert alert-primary mb-0 mt-2">
                            <i className="fa fa-file-word-o mr-2"></i>{" "}
                            <span>finame12.doc</span>
                          </div>
                        </div>
                        <span className="data_time">10:12 AM, Today</span>
                      </li>
                      <li className="left clearfix">
                        <img
                          className="user_pix"
                          src="/assets/images/user.png"
                          alt="avatar"
                        />
                        <div className="message">
                          <Link to="" className="smily">
                            <i className="fa fa-smile-o"></i>
                          </Link>
                          <span>Are we meeting today?</span>
                          <div className="alert alert-primary mb-0 mt-2">
                            <i className="fa fa-file-word-o mr-2"></i>{" "}
                            <span>finame12.doc</span>
                          </div>
                        </div>
                        <span className="data_time">10:12 AM, Today</span>
                      </li>
                    </ul>
                  </div>
                  <div class="chat-message">
                    <div class="form-group c_form_group mb-0 d-flex align-items-center">
                      <textarea
                        type="text"
                        rows="1"
                        className="form-control flex-grow-1 chat-message__textarea"
                        placeholder="Enter text here..."
                        // value={message}
                        // onChange={handleInputChange}
                      />
                      <button
                        type="button"
                        className="btn btn-primary send-message-btn chat-message__button"
                        // onClick={handleSendMessage}
                      >
                        <i class="fa fa-paper-plane"></i>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TaskChat;
