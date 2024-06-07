import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import channelService from "./services/channelService";
import chatService from "./services/chatService";
import authService from "./services/authService";
import moment from "moment";
import ChatHistory from "../components/ChatHistory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../Css/chat.css";

const Chat = ({ loggedInUser }) => { // Pass loggedInUser as a prop
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [recipientid, setRecipientid] = useState("");
  const [channels, setChannels] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState("");
  const [selectedChatHistory, setSelectedChatHistory] = useState([]);
  const [retrievedUser, setRetrievedUser] = useState(loggedInUser || {}); // Use passed loggedInUser or default to empty object
  const [isOpen, setIsOpen] = useState(false); // State for user detail visibility

  useEffect(() => {
    const retrievedUser = JSON.parse(localStorage.getItem("loginuser")) || {};
    setRetrievedUser(retrievedUser);
  }, []);

  const toggleDetail = () => {
    setIsOpen(!isOpen);
  };

  const handleChannelSelection = (event) => {
    setSelectedChannel(event.target.value);
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const formatChatTime = (time) => {
    const now = moment();
    const chatTime = moment(time);
    const diffInMinutes = now.diff(chatTime, "minutes");
    const diffInHours = now.diff(chatTime, "hours");
    const diffInDays = now.diff(chatTime, "days");

    if (diffInMinutes < 1) {
      return "Just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      if (diffInHours === 1) {
        return `${diffInHours} hour ago`;
      }
      return `${diffInHours} hours ago`;
    } else if (diffInDays === 1) {
      return "Yesterday, " + chatTime.format("h:mm A");
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago, ` + chatTime.format("h:mm A");
    } else {
      return chatTime.format("MMMM D, YYYY, h:mm A");
    }
  };

  const formatChattimedate = (time) => {
    const chatTime = moment(time);
    return chatTime.format("h:mm A");
  };

  const formatChatday = (time) => {
    const now = moment();
    const chatTime = moment(time);
    const diffInDays = now.diff(chatTime, "days");

    if (diffInDays < 1) {
      return "today";
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago `+chatTime.format("d");
    } else {
      return chatTime.format("D MMMM, YYYY");
    }
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (message.trim()) {
      handleSubmit(event);
      setMessage(""); 
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await chatService.sendChat({
        msg: message,
        rec: recipientid,
        chnl: selectedChannel,
        sender_name: loggedInUser.un,
        sender_avatar: "https://avatar.example.com",
        typeofmsg: "text",
      });

      const sentMessage = {
        message: message,
        sent: 1,
        time: response.time 
      };

      setSelectedChatHistory([...selectedChatHistory, sentMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setMessage("");
  };

  const handleRecipientClick = (recipientName, recid, chnl) => {
    const selectedChat = chats.find(
      (chat) => chat.recid === recid
    );
    recipientName = recipientName || "Unknown";
    setRecipient(recipientName);
    setRecipientid(recid);
    setSelectedChannel(chnl);

    if (selectedChat) {
      setSelectedChatHistory(selectedChat.history);
    }
  };

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await channelService.getChannel({
          searchquery: { _id: "raidlayer" },
          projection: { chnl: 1 },
          showcount: 1,
        });
        setChannels(response.data.data[0].chnl);
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    };

    const fetchChats = async () => {
      try {
        const response = await authService.getData({
          searchquery: { _id: "raidlayer" },
          projection: { chat: 1 },
          showcount: 1,
        });
        const chatsArray = Object.values(response.data.data[0].chat);

        // Sort chats based on the time of the last message
        chatsArray.sort((a, b) => {
          const lastMessageTimeA = new Date(a.time);
          const lastMessageTimeB = new Date(b.time);
          return lastMessageTimeB - lastMessageTimeA; // Sort in descending order
        });

        setChats(chatsArray);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
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
                    <li className="nav-item flex-fill">
                      <a
                        data-toggle="tab"
                        className="nav-link"
                        href="#create-chat"
                      >
                        Create
                      </a>
                    </li>
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
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                          </span>
                        </div>
                      </div>
                      <ul className="right_chat list-unstyled mb-0 animation-li-delay">
                        {chats.map((chat, index) => (
                          <li key={index} className="online">
                            <a
                              href="javascript:void(0);"
                              className="media"
                              onClick={() =>
                                handleRecipientClick(
                                  chat.name,
                                  chat.recid,
                                  chat.lstcnl
                                )
                              }
                            >
                              <img
                                className="media-object"
                                src="assets/images/xs/avatar4.jpg"
                                alt=""
                              />
                              <div className="media-body">
                                <span className="name">
                                  {chat.name || "Unknown"}{" "}
                                  <small className="text-muted">
                                    {formatChatTime(chat.time)}
                                  </small>
                                </span>
                                <span className="message">
                                  {chat.lastMessage || "No message available"}
                                </span>
                                <span className="badge badge-outline status"></span>
                              </div>
                            </a>
                          </li>
                        ))}
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
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                          </span>
                        </div>
                      </div>
                      <div>
                        <form className="message-form" onSubmit={handleSubmit}>
                          <div className="form-group">
                            <label htmlFor="message">
                              <h6>Enter Message</h6>
                            </label>
                            <textarea
                              id="message"
                              name="message"
                              rows="4"
                              placeholder="Type your message here..."
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="recipient">
                              <h6>Enter Mobile Number or ID</h6>
                            </label>
                            <input
                              type="text"
                              id="recipient"
                              name="recipient"
                              placeholder="Enter recipient's mobile number or ID"
                              value={recipient}
                              onChange={(e) => setRecipient(e.target.value)}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="channelSelect">
                              <h6>Select Channel</h6>
                            </label>
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
                          <button type="submit" className="btn btn-primary mt-3">
                            Send Message
                          </button>
                        </form>
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
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
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
                  <div class="chat-header" onClick={toggleDetail}>
                    <a href="javascript:void(0);" class="open_detail bg-white">
                      <div class="media mb-0">
                        <img
                          class="rounded-circle w35"
                          src="assets/images/user.png"
                          alt=""
                        />
                        <div class="media-body mr-3 ml-3 text-muted">
                          <h6 class="m-0">{recipient || "Unknown"}</h6>
                          <small>{recipientid||'-'}</small>
                        </div>
                      </div>
                    </a>
                    <div>
                      <div class="form-group">
                        <select
                          className="form-control  "
                          id="channelSelect"
                          title="Channels"
                          value={selectedChannel}
                          onChange={handleChannelSelection}
                        >
                          <option val="">Channels</option>
                          {channels.map((channel) => (
                            <option key={channel.lbl} value={channel.lbl}>
                              {channel.lbl}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <ChatHistory
                    selectedChatHistory={selectedChatHistory}
                    formatChatday={formatChatday}
                    formatChattimedate={formatChattimedate}
                  />
                  <div class="chat-message">
                    <div class="form-group c_form_group mb-0 d-flex align-items-center">
                      <textarea
                        type="text"
                        rows="1"
                        className="form-control flex-grow-1 chat-message__textarea"
                        placeholder="Enter text here..."
                        value={message}
                        onChange={handleInputChange}
                      />
                      <button
                        type="button"
                        className="btn btn-primary send-message-btn chat-message__button"
                        onClick={handleSendMessage}
                      >
                        <i class="fa fa-paper-plane"></i>
                      </button>
                    </div>
                  </div>

                  <div class={`user_detail ${isOpen ? 'open' : ''}`}>
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
