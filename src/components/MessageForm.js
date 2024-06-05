import React from 'react';

const MessageForm = ({ message, setMessage, recipient, setRecipient, channels, selectedChannel, handleChannelSelection, handleSubmit }) => (
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
      <select className="form-control" id="channelSelect" value={selectedChannel} onChange={handleChannelSelection}>
        <option value="0">Channels</option>
        {channels.map(channel => (
          <option key={channel.lbl} value={channel.lbl}>
            {channel.lbl}
          </option>
        ))}
      </select>
    </div>
    <button type="submit" className="btn btn-primary">Send Message</button>
  </form>
);

export default MessageForm;
