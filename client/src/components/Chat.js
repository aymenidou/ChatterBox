import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from '../axiosInstance';
import UserModal from './UserModal';

const Chat = ({ token, username, setToken, setUsername }) => {
  const [socket, setSocket] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');
  const [currentRoom, setCurrentRoom] = useState('');
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      query: { token, username }
    });
    setSocket(newSocket);

    newSocket.on('connectedUsers', (users) => {
      setConnectedUsers(users);
    });

    return () => newSocket.close();
  }, [token, username]);
  useEffect(() => {
    if (socket) {
      socket.on('loadMessages', (loadedMessages) => {
        setMessages(loadedMessages);
      });

      socket.on('newMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [socket]);

  const handleLogout = () => {
    if (socket) {
      socket.disconnect();
    }
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/login';
  };

  const handleJoinRoom = (roomName) => {
    if (socket) {
      socket.emit('joinRoom', roomName);
      setCurrentRoom(roomName);
    }
  };


  const handleCreateRoom = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/rooms', { name: newRoomName });
      setRooms((prevRooms) => [...prevRooms, response.data]);
      setNewRoomName('');
    } catch (err) {
      console.error(err);
      alert('Error creating room');
    }
  };

  // fetch available rooms from database
  const fetchRooms = async () => {
    try {
      const response = await axios.get('/rooms');
      setRooms(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleEditUser = () => {
    setIsModalOpen(true);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      socket.emit('sendMessage', { roomName: currentRoom, username, message: newMessage });
      setNewMessage('');
    }
  };


  return (
    <div className="d-flex h-100 w-100">
      <div className="col-3 p-3 bg-light border-end">
        <h5>Chat Rooms</h5>
        <h6>Connected user : {username}</h6>
        <h6>Bio : </h6>
        <button className="btn btn-primary mb-3" onClick={handleEditUser}>Edit Profile</button>
        <button className="btn btn-danger mb-3" onClick={handleLogout}>Logout</button>
        <div className="mb-4">
          <select className="form-select" size="7" aria-label="Chat rooms">
            {rooms.map((room) => (
              <option key={room._id} onClick={() => handleJoinRoom(room.name)}>
                {room.name}
              </option>
            ))}
          </select>
        </div>
        <form onSubmit={handleCreateRoom} className="mb-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              placeholder="New room name"
            />
            <button type="submit" className="btn btn-primary">Create</button>
          </div>
        </form>
        <hr />
        <h5>Connected Users</h5>
        <ul className="list-group">
          {connectedUsers.map((user, index) => (
            <li key={index} className="list-group-item ">
              {user}
            </li>
          ))}
        </ul>
      </div>
      <div className="col-9 d-flex flex-column p-0 position-relative">
        <div className="bg-light border-bottom p-3">
          <h5 className="mb-0">{currentRoom}</h5>
        </div>
        <div className="flex-grow-1 p-2 overflow-scroll" >
          {messages.map((msg, index) => (
            <div key={index} className={`p-1 m-2 border ${msg.username === username ? '' : ''}`}>
              <div key={index} className={`border m-1 border ${msg.username === username ? 'border-success' : ''}`}>
                <div className="fw-bold ">{msg.username} :</div>
                <div>{msg.message}</div>
              </div>
            </div>
          ))}
        </div>
        <footer className="border-top p-3">
          <form onSubmit={handleSendMessage} className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Enter your message"
            />
            <button type="submit" className="btn btn-primary">Send</button>
          </form>
        </footer>
      </div>
      {isModalOpen && <UserModal setUsername={setUsername} username={username} setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default Chat;