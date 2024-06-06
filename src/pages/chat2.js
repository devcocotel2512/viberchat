import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import channelService from "./services/channelService";
import chatService from "./services/chatService";
import authService from "./services/authService";
import moment from "moment";
import ChatHistory from "./ChatHistory"; // Import the ChatHistory component

const Chat = () => {
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [channels, setChannels] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState("");
  const [selectedChatHistory, setSelectedChatHistory] = useState([]);

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
      return "Yesterday, " + chatTime.format("h:mm A");
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago, ` + chatTime.format("h:mm A");
    } else {
      return chatTime.format("MMMM D, YYYY, h:mm A");
    }
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      try {
        const response = await chatService.sendChat({
          msg: message,
          rec: recipient,
          chnl: selectedChannel,
          sender_name: "gayatriaaaa",
          sender_avatar: "https://avatar.example.com",
          typeofmsg: "text",
        });
        console.log("Message sent successfully:", response);
        
        // Add the sent message to the chat history
        setSelectedChatHistory((prevHistory) => [
          ...prevHistory,
          {
            message,
            sent: 1, // Assuming 1 indicates a sent message
            time: new Date().toISOString(), // Use the current time
          },
        ]);
      } catch (error) {
        console.error("Error sending message:", error);
      }

      setMessage(""); // Clear textarea after sending a non-empty message
    }
  };

  const handleRecipientClick = (recipientName, index) => {
    const selectedChat = chats.find(
      (chat) => chat.recipient_name === recipientName
    );
    setRecipient(index);
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
        console.log("Chats fetched:", response.data.data[0].chat);
        const chatsArray = Object.values(response.data.data[0].chat);
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
                            <i className="icon-magnifier"></i>
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
                                handleRecipientClick(chat.recipient_name, index)
                              }
                            >
                              <img
                                className="media-object"
                                src="assets/images/xs/avatar4.jpg"
                                alt=""
                              />
                              <div className="media-body">
                                <span className="name">{chat.recipient_name}</span>
                                <span className="message">{chat.msg}</span>
                                <span className="badge badge-outline status"></span>
                                <span className="timestamp">{chat.time}</span>
                              </div>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="tab-pane vivify fadeIn" id="create-chat">
                      <form
                        className="input-group"
                        onSubmit={handleSubmit}
                        style={{ flexDirection: "column" }}
                      >
                        <div className="mb-3">
                          <textarea
                            rows="3"
                            className="form-control no-resize"
                            placeholder="Please type what you want..."
                            value={message}
                            onChange={handleInputChange}
                          ></textarea>
                        </div>
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={handleSendMessage}
                        >
                          Send
                        </button>
                      </form>
                    </div>
                    <div className="col-lg-8">
                      <div className="card">
                        <div className="chat-window">
                          <div className="chat-header">
                            <h3>{recipient}</h3>
                          </div>
                          <div className="chat-body">
                            <ChatHistory
                              selectedChatHistory={selectedChatHistory}
                              formatChatday={formatChatday}
                              formatChattimedate={formatChattimedate}
                            />
                          </div>
                          <div className="chat-footer">
                            <div className="input-group">
                              <textarea
                                className="form-control"
                                placeholder="Type your message..."
                                value={message}
                                onChange={handleInputChange}
                              ></textarea>
                              <div className="input-group-append">
                                <button
                                  className="btn btn-primary"
                                  type="button"
                                  onClick={handleSendMessage}
                                >
                                  Send
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="chat-window col-lg-8"
                      style={{ display: "none" }}
                    >
                      <div className="chat-header">
                        <h3>{recipient}</h3>
                      </div>
                      <div className="chat-body">
                        <ChatHistory
                          selectedChatHistory={selectedChatHistory}
                          formatChatday={formatChatday}
                          formatChattimedate={formatChattimedate}
                        />
                      </div>
                      <div className="chat-footer">
                        <div className="input-group">
                          <textarea
                            className="form-control"
                            placeholder="Type your message..."
                            value={message}
                            onChange={handleInputChange}
                          ></textarea>
                          <div className="input-group-append">
                            <button
                              className="btn btn-primary"
                              type="button"
                              onClick={handleSendMessage}
                            >
                              Send
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                    {chats.map((chat, index) => (
                      <li key={index} className="online">
                        <a
                          href="javascript:void(0);"
                          className="media"
                          onClick={() =>
                            handleRecipientClick(chat.recipient_name, index)
                          }
                        >
                          <img
                            className="media-object"
                            src="assets/images/xs/avatar4.jpg"
                            alt=""
                          />
                          <div className="media-body">
                            <span className="name">{chat.recipient_name}</span>
                            <span className="message">{chat.msg}</span>
                            <span className="badge badge-outline status"></span>
                            <span className="timestamp">{chat.time}</span>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="tab-pane vivify fadeIn" id="create-chat">
                  <form
                    className="input-group"
                    onSubmit={handleSubmit}
                    style={{ flexDirection: "column" }}
                  >
                    <div className="mb-3">
                      <textarea
                        rows="3"
                        className="form-control no-resize"
                        placeholder="Please type what you want..."
                        value={message}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={handleSendMessage}
                    >
                      Send
                    </button>
                  </form>
                </div>
                <div className="col-lg-8">
                  <div className="card">
                    <div className="chat-window">
                      <div className="chat-header">
                        <h3>{recipient}</h3>
                      </div>
                      <div className="chat-body">
                        <ChatHistory
                          selectedChatHistory={selectedChatHistory}
                          formatChatday={formatChatday}
                          formatChattimedate={formatChattimedate}
                        />
                      </div>
                      <div className="chat-footer">
                        <div className="input-group">
                          <textarea
                            className="form-control"
                            placeholder="Type your message..."
                            value={message}
                            onChange={handleInputChange}
                          ></textarea>
                          <div className="input-group-append">
                            <button
                              className="btn btn-primary"
                              type="button"
                              onClick={handleSendMessage}
                            >
                              Send
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="chat-window col-lg-8"
                  style={{ display: "none" }}
                >
                  <div className="chat-header">
                    <h3>{recipient}</h3>
                  </div>
                  <div className="chat-body">
                    <ChatHistory
                      selectedChatHistory={selectedChatHistory}
                      formatChatday={formatChatday}
                      formatChattimedate={formatChattimedate}
                    />
                  </div>
                  <div className="chat-footer">
                    <div className="input-group">
                      <textarea
                        className="form-control"
                        placeholder="Type your message..."
                        value={message}
                        onChange={handleInputChange}
                      ></textarea>
                      <div className="input-group-append">
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={handleSendMessage}
                        >
                          Send
                        </button>
                      </div>
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
