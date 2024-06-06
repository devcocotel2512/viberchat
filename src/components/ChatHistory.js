import React, { useEffect, useRef } from 'react';

const ChatHistory = ({ selectedChatHistory, formatChatday, formatChattimedate }) => {
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChatHistory]);

  return (
    <div className="chat-history">
      <ul className="message_data">
        {selectedChatHistory.map((messageObject, index) => (
          <div key={index}>
            {index === 0 && (
              <div className="text-center">
                <span className="badge bg-blue border-0">{formatChatday(messageObject.time)}</span>
              </div>
            )}
            {index > 0 && formatChatday(selectedChatHistory[index - 1].time) !== formatChatday(messageObject.time) && (
              <div className="text-center">
                <span className="badge bg-blue border-0">{formatChatday(messageObject.time)}</span>
              </div>
            )}
            <li
              className={messageObject.sent === 0 ? 'left clearfix' : 'right clearfix'}
              ref={index === selectedChatHistory.length - 1 ? lastMessageRef : null}
            >
              <img className="user_pix" src="assets/images/xs/avatar7.jpg" alt="avatar" />
              <div className="message">
                <a href="#" className="smily"><i className="fa fa-smile-o"></i></a>
                <span>{messageObject.message} </span>
              </div>
              <span className="data_time">{formatChattimedate(messageObject.time)}</span>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ChatHistory;
