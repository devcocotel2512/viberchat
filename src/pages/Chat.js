import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import channelService from "./services/channelService";
import { resolvePath } from "react-router-dom";

const Chat = () => {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState("");
  const handleChannelSelection = (event) => {
    setSelectedChannel(event.target.value); // Update state on selection change
  };

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await channelService.getChannel({
          searchquery: {
            _id: "raidlayer",
          },
          projection: {
            chnl: 1,
          },
          showcount: 1,
        }); // Replace '/channels' with your actual API endpoint
        // console.log(response.data.data[0].chnl);
        setChannels(response.data.data[0].chnl);
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    };

    fetchChannels();
  }, []);
  return (
    <Layout>
      <div id="main-content">
        <div className="container-fluid pb-2">
         
          <div className="row clearfix">
            <div className="col-lg-12">
              <div className="card bg-white text-dark">
                <div className="chatapp_list">
                  <ul className="nav nav-tabs2 mb-4 d-flex text-center">
                    <li className="nav-item flex-fill">
                      <a
                        data-toggle="tab"
                        className="nav-link active show"
                        href="#chats-Users"
                      >
                        Chat
                      </a>
                    </li>
                    {/* <li className="nav-item flex-fill"><a data-toggle="tab" className="nav-link" href="#create-chat">Groups</a></li> */}
                    <li className="nav-item flex-fill">
                      <a
                        data-toggle="tab"
                        className="nav-link"
                        href="#create-chat"
                      >
                        Create
                      </a>
                    </li>
                    {/* <li className="nav-item flex-fill"><a data-toggle="tab" className="nav-link mr-0" href="#chats-Contact">Contact</a></li> */}
                  </ul>
                  <div className="tab-content">
                    <div
                      className="tab-pane vivify fadeIn active show"
                      id="chats-Users"
                    >
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search..."
                        />
                        <div className="input-group-append">
                          <span className="input-group-text">
                            <i className="icon-magnifier"></i>
                          </span>
                        </div>
                      </div>
                      <ul className="right_chat list-unstyled mb-0 animation-li-delay">
                        <li class="online">
                          <a href="javascript:void(0);" class="media">
                            <img
                              class="media-object"
                              src="assets/images/xs/avatar4.jpg"
                              alt=""
                            />
                            <div class="media-body">
                              <span class="name">
                                Louis Henry{" "}
                                <small class="text-muted">10 min</small>
                              </span>
                              <span class="message">How do you do?</span>
                              <span class="badge badge-outline status"></span>
                            </div>
                          </a>
                        </li>
                        <li class="online active">
                          <a href="javascript:void(0);" class="media">
                            <img
                              class="media-object "
                              src="assets/images/xs/avatar5.jpg"
                              alt=""
                            />
                            <div class="media-body">
                              <span class="name">
                                Debra Stewart{" "}
                                <small class="text-muted">15 min</small>
                              </span>
                              <span class="message">I was wondering...</span>
                              <span class="badge badge-outline status"></span>
                            </div>
                          </a>
                        </li>
                        <li class="offline">
                          <a href="javascript:void(0);" class="media">
                            <img
                              class="media-object "
                              src="assets/images/xs/avatar2.jpg"
                              alt=""
                            />
                            <div class="media-body">
                              <span class="name">
                                Lisa Garett{" "}
                                <small class="text-muted">18 min</small>
                              </span>
                              <span class="message">
                                I've forgotten how it felt before
                              </span>
                              <span class="badge badge-outline status"></span>
                            </div>
                          </a>
                        </li>
                        <li class="offline">
                          <a href="javascript:void(0);" class="media">
                            <img
                              class="media-object "
                              src="assets/images/xs/avatar1.jpg"
                              alt=""
                            />
                            <div class="media-body">
                              <span class="name">
                                Folisise Chosielie{" "}
                                <small class="text-muted">23 min</small>
                              </span>
                              <span class="message">
                                Wasup for the third time like...
                              </span>
                              <span class="badge badge-outline status"></span>
                            </div>
                          </a>
                        </li>
                        <li class="online">
                          <a href="javascript:void(0);" class="media">
                            <img
                              class="media-object "
                              src="assets/images/xs/avatar3.jpg"
                              alt=""
                            />
                            <div class="media-body">
                              <span class="name">
                                Marshall Nichols{" "}
                                <small class="text-muted">27 min</small>
                              </span>
                              <span class="message">
                                But we’re probably gonna need a new carpet.
                              </span>
                              <span class="badge badge-outline status"></span>
                            </div>
                          </a>
                        </li>
                        <li class="online">
                          <a href="javascript:void(0);" class="media">
                            <img
                              class="media-object "
                              src="assets/images/xs/avatar5.jpg"
                              alt=""
                            />
                            <div class="media-body">
                              <span class="name">
                                Debra Stewart{" "}
                                <small class="text-muted">38 min</small>
                              </span>
                              <span class="message">It’s not that bad...</span>
                              <span class="badge badge-outline status"></span>
                            </div>
                          </a>
                        </li>
                        <li class="offline">
                          <a href="javascript:void(0);" class="media">
                            <img
                              class="media-object "
                              src="assets/images/xs/avatar2.jpg"
                              alt=""
                            />
                            <div class="media-body">
                              <span class="name">
                                Lisa Garett{" "}
                                <small class="text-muted">45 min</small>
                              </span>
                              <span class="message">How do you do?</span>
                              <span class="badge badge-outline status"></span>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="tab-pane vivify fadeIn" id="create-chat">
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search..."
                        />
                        <div className="input-group-append">
                          <span className="input-group-text">
                            <i className="icon-magnifier"></i>
                          </span>
                        </div>
                      </div>
                      <div>
                        <h6>Enter Mobile Number</h6>
                        <input type="text" />
                        <button
                          type="submit"
                          className="btn btn-dark btn-lg btn-block"
                        >
                          LOGIN
                        </button>
                      </div>
                    </div>
                    <div className="tab-pane vivify fadeIn" id="chats-Contact">
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search..."
                        />
                        <div className="input-group-append">
                          <span className="input-group-text">
                            <i className="icon-magnifier"></i>
                          </span>
                        </div>
                      </div>
                      <ul className="right_chat list-unstyled mb-0 animation-li-delay">
                        <li class="online">
                          <a href="javascript:void(0);" class="media">
                            <img
                              class="media-object"
                              src="assets/images/xs/avatar4.jpg"
                              alt=""
                            />
                            <div class="media-body">
                              <span class="name">
                                Louis Henry{" "}
                                <small class="text-muted">10 min</small>
                              </span>
                              <span class="message">How do you do?</span>
                              <span class="badge badge-outline status"></span>
                            </div>
                          </a>
                        </li>
                        <li class="online active">
                          <a href="javascript:void(0);" class="media">
                            <img
                              class="media-object "
                              src="assets/images/xs/avatar5.jpg"
                              alt=""
                            />
                            <div class="media-body">
                              <span class="name">
                                Debra Stewart{" "}
                                <small class="text-muted">15 min</small>
                              </span>
                              <span class="message">I was wondering...</span>
                              <span class="badge badge-outline status"></span>
                            </div>
                          </a>
                        </li>
                        <li class="offline">
                          <a href="javascript:void(0);" class="media">
                            <img
                              class="media-object "
                              src="assets/images/xs/avatar2.jpg"
                              alt=""
                            />
                            <div class="media-body">
                              <span class="name">
                                Lisa Garett{" "}
                                <small class="text-muted">18 min</small>
                              </span>
                              <span class="message">
                                I've forgotten how it felt before
                              </span>
                              <span class="badge badge-outline status"></span>
                            </div>
                          </a>
                        </li>
                        <li class="offline">
                          <a href="javascript:void(0);" class="media">
                            <img
                              class="media-object "
                              src="assets/images/xs/avatar1.jpg"
                              alt=""
                            />
                            <div class="media-body">
                              <span class="name">
                                Folisise Chosielie{" "}
                                <small class="text-muted">23 min</small>
                              </span>
                              <span class="message">
                                Wasup for the third time like...
                              </span>
                              <span class="badge badge-outline status"></span>
                            </div>
                          </a>
                        </li>
                        <li class="online">
                          <a href="javascript:void(0);" class="media">
                            <img
                              class="media-object "
                              src="assets/images/xs/avatar3.jpg"
                              alt=""
                            />
                            <div class="media-body">
                              <span class="name">
                                Marshall Nichols{" "}
                                <small class="text-muted">27 min</small>
                              </span>
                              <span class="message">
                                But we’re probably gonna need a new carpet.
                              </span>
                              <span class="badge badge-outline status"></span>
                            </div>
                          </a>
                        </li>
                        <li class="online">
                          <a href="javascript:void(0);" class="media">
                            <img
                              class="media-object "
                              src="assets/images/xs/avatar5.jpg"
                              alt=""
                            />
                            <div class="media-body">
                              <span class="name">
                                Debra Stewart{" "}
                                <small class="text-muted">38 min</small>
                              </span>
                              <span class="message">It’s not that bad...</span>
                              <span class="badge badge-outline status"></span>
                            </div>
                          </a>
                        </li>
                        <li class="offline">
                          <a href="javascript:void(0);" class="media">
                            <img
                              class="media-object "
                              src="assets/images/xs/avatar2.jpg"
                              alt=""
                            />
                            <div class="media-body">
                              <span class="name">
                                Lisa Garett{" "}
                                <small class="text-muted">45 min</small>
                              </span>
                              <span class="message">How do you do?</span>
                              <span class="badge badge-outline status"></span>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="chatapp_body">
                  <div class="chat-header">
                    <a href="javascript:void(0);" class="open_detail bg-white">
                      <div class="media mb-0">
                        <img
                          class="rounded-circle w35"
                          src="assets/images/user.png"
                          alt=""
                        />
                        <div class="media-body mr-3 ml-3 text-muted">
                          <h6 class="m-0">Deborah Cox</h6>
                          <small>Webdeveloper</small>
                        </div>
                      </div>
                    </a>
                    <div>
                      <div class="form-group">
                        <select
                          class="form-control"
                          id="channelSelect"
                          title="Channels"
                          value={selectedChannel}
                          onChange={handleChannelSelection}
                        >
                          <option val="0">Channels</option>
                          {channels.map((channel) => (
                            <option key={channel.lbl} value={channel.lbl}>
                              {channel.lbl}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* <a href="javascript:void(0);" class=" bg-white btn btn-sm btn-default"><i class="fa fa-image"></i></a>
                                            <a href="javascript:void(0);" class=" bg-white btn btn-sm btn-default"><i class="fa fa-video-camera"></i></a>
                                            <a href="javascript:void(0);" class=" bg-white btn btn-sm btn-default"><i class="fa fa-plus"></i></a> */}
                    </div>
                  </div>
                  <div class="chat-history">
                    <ul class="message_data">
                      <li class="right clearfix">
                        <img
                          class="user_pix"
                          src="assets/images/xs/avatar7.jpg"
                          alt="avatar"
                        />
                        <div class="message">
                          <a href="#" class="smily">
                            <i class="fa fa-smile-o"></i>
                          </a>
                          <span>
                            Hi Aiden, how are you?
                            <br /> How is the project coming along?
                          </span>
                        </div>
                        <span class="data_time">10:12 AM, Today</span>
                      </li>
                      <li class="left clearfix">
                        <img
                          class="user_pix"
                          src="assets/images/user.png"
                          alt="avatar"
                        />
                        <div class="message">
                          <a href="#" class="smily">
                            <i class="fa fa-smile-o"></i>
                          </a>
                          <span>Are we meeting today?</span>
                          <div class="alert alert-primary mb-0 mt-2">
                            <i class="fa fa-file-word-o mr-2"></i>{" "}
                            <span>filename12.doc</span>
                          </div>
                        </div>
                        <span class="data_time">10:12 AM, Today</span>
                      </li>
                      <li class="right clearfix">
                        <img
                          class="user_pix"
                          src="assets/images/xs/avatar5.jpg"
                          alt="avatar"
                        />
                        <div class="message">
                          <a href="#" class="smily">
                            <i class="fa fa-smile-o"></i>
                          </a>
                          <span>How is the project coming along?</span>
                        </div>
                        <span class="data_time">10:12 AM, Today</span>
                      </li>
                      <li class="divider clearfix">
                        <span>yesterday</span>
                      </li>
                      <li class="left clearfix">
                        <img
                          class="user_pix"
                          src="assets/images/user.png"
                          alt="avatar"
                        />
                        <div class="message">
                          <a href="#" class="smily">
                            <i class="fa fa-smile-o"></i>
                          </a>
                          <span>
                            Project has been already finished and I have
                            <br /> results to show you.
                          </span>
                        </div>
                        <span class="data_time">10:16 AM, Yesterday</span>
                      </li>
                      <li class="right clearfix">
                        <img
                          class="user_pix"
                          src="assets/images/xs/avatar5.jpg"
                          alt="avatar"
                        />
                        <div class="message">
                          <a href="#" class="smily">
                            <i class="fa fa-smile-o"></i>
                          </a>
                          <span>How is the project coming along?</span>
                          <div class="mt-2">
                            <img
                              class="w100"
                              src="assets/images/image-gallery/1.jpg"
                              alt=""
                            />
                            <img
                              class="w100"
                              src="assets/images/image-gallery/2.jpg"
                              alt=""
                            />
                            <img
                              class="w100"
                              src="assets/images/image-gallery/3.jpg"
                              alt=""
                            />
                          </div>
                        </div>
                        <span class="data_time">10:12 AM, Today</span>
                      </li>
                    </ul>
                  </div>
                  <div class="chat-message">
                    <div class="form-group c_form_group mb-0">
                      <textarea
                        type="text"
                        row=""
                        class="form-control"
                        placeholder="Enter text here..."
                      ></textarea>
                    </div>
                  </div>
                  <div class="user_detail">
                    <div class="text-center mb-4">
                      <div class="profile-image">
                        <img
                          src="assets/images/user.png"
                          class="rounded-circle mb-3"
                          alt=""
                        />
                      </div>
                      <h4 class="m-b-0">Louis Pierce</h4>
                      <span>Washington, d.c.</span>
                    </div>
                    <div class="text-center">
                      <small class="text-muted">Address: </small>
                      <p>795 Folsom Ave, Suite 600 San Francisco, 94107</p>
                      <small class="text-muted">Email address: </small>
                      <p>louispierce@example.com</p>
                      <small class="text-muted">Mobile: </small>
                      <p>+ 202-222-2121</p>
                      <small class="text-muted">Birth Date: </small>
                      <p class="m-b-0">October 17th, 93</p>
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

export default Chat;
