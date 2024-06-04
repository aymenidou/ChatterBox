import React, { useEffect, useState } from 'react';

const Chat = ({ token, username, setToken, setUsername }) => {


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/login';
  };


  return (
    <div className="chat-container">
      <div className="sidebar">
        <h2>Chat Rooms</h2>
        <h4>connected user : {username}</h4>
        <button className='' onClick={handleLogout}>Logout</button>
      </div>
      <div className="chat-box">

      </div>
    </div>
  );
};

export default Chat;