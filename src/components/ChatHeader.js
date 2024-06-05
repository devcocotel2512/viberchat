import React from 'react';

const ChatHeader = ({ channels, selectedChannel, handleChannelSelection }) => (
  <div className="chat-header">
    <a href="javascript:void(0);" className="open_detail bg-white">
      <div className="media mb-0">
        <img className="rounded-circle w35" src="assets/images/user.png" alt="" />
        <div className="media-body mr-3 ml-3 text-muted">
          <h6 className="m-0">Deborah Cox</h6>
          <small>Webdeveloper</small>
        </div>
      </div>
    </a>
    <div>
      <div className="form-group">
        <select className="form-control" id="channelSelect" value={selectedChannel} onChange={handleChannelSelection}>
          <option value="0">Channels</option>
          {channels.map(channel => (
            <option key={channel.lbl} value={channel.lbl}>
              {channel.lbl}
            </option>
          ))}
        </select>
      </div>
    </div>
  </div>
);

export default ChatHeader;
