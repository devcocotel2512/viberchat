import React from 'react';
import moment from 'moment';

const formatChatTime = (time) => {
  const now = moment();
  const chatTime = moment(time);
  const diffInMinutes = now.diff(chatTime, 'minutes');
  const diffInHours = now.diff(chatTime, 'hours');
  const diffInDays = now.diff(chatTime, 'days');

  if (diffInMinutes < 1) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else if (diffInDays === 1) {
    // return 'Yesterday, ' + chatTime.format('h:mm A');
    return 'Yesterday, ' + chatTime.format('h:mm A');
  } else if (diffInDays < 7) {
    // return `${diffInDays} days ago, ` + chatTime.format('h:mm A');
    return `${diffInDays} days ago, ` + chatTime.format('h:mm A');
  } else {
    return chatTime.format('MMMM D, YYYY, h:mm A');
  }
};

const ChatList = ({ chats, handleRecipientClick }) => (
  <ul className="right_chat list-unstyled mb-0 animation-li-delay">
    {chats.map((chat, index) => (
      <li key={index} className="online">
        <a href="javascript:void(0);" className="media" onClick={() => handleRecipientClick(chat.recipient_name, index)}>
          <img className="media-object" src="assets/images/xs/avatar4.jpg" alt="" />
          <div className="media-body">
            <span className="name">{chat.rec || 'Unknown'} <small className="text-muted">{formatChatTime(chat.time)}</small></span>
            <span className="message">{chat.lastMessage || 'No message available'}</span>
            <span className="badge badge-outline status"></span>
          </div>
        </a>
      </li>
    ))}
  </ul>
);

export default ChatList;
