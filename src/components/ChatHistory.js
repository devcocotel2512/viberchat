import React, { useEffect, useRef } from 'react';

const ChatHistory = ({ selectedChatHistory, formatChatday, formatChattimedate }) => {
  const chatEndRef = useRef(null);

  // Scroll to the bottom of the chat history whenever it updates
  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChatHistory]); // Scroll when selectedChatHistory updates

  return (
    <div className="chat-history">
      <ul className="message_data">
        {selectedChatHistory.map((messageObject, index) => (
          <div key={index}>
            {/* Render date badge if it's a new day */}
            {index === 0 || formatChatday(selectedChatHistory[index - 1].time) !== formatChatday(messageObject.time) && (
              <div className="text-center">
                <span className="badge bg-blue border-0">{formatChatday(messageObject.time)}</span>
              </div>
            )}
            <li key={index} className={messageObject.sent === 0 ? 'left clearfix' : 'right clearfix'}>
              {/* Apply different classes based on sent status */}
              <img className="user_pix" src="assets/images/xs/avatar7.jpg" alt="avatar" />
              <div className="message">
                <a href="#" className="smily"><i className="fa fa-smile-o"></i></a>
                <span>{messageObject.message} </span>
              </div>
              <span className="data_time">{formatChattimedate(messageObject.time)}</span>
            </li>
          </div>
        ))}
        {/* This empty div is used to scroll to the bottom */}
        <div ref={chatEndRef}></div>
      </ul>
    </div>
  );
};

export default ChatHistory;
