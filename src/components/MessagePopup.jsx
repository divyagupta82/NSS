// MessagePopup.js
import React from 'react';
import '../MessagePop.css'; // Import the CSS for styling

const MessagePopup = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MessagePopup;
