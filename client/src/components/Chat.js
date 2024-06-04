import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Chat = ({ token, username, setToken, setUsername }) => {
  const [socket, setSocket] = useState(null);


  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      query: { token }
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [token]);

  const handleLogout = () => {
      if (socket) {
        socket.disconnect();
      }
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