import React from 'react';

const ChatHistory = ({ selectedChatHistory, formatChatday, formatChattimedate }) => {
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
            <li className="right clearfix">
              <img className="user_pix" src="assets/images/xs/avatar7.jpg" alt="avatar" />
              <div className="message">
                <a href="#" className="smily"><i className="fa fa-smile-o"></i></a>
                <span>{messageObject.message}</span>
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
