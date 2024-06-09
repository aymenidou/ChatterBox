import React, { useState } from 'react';
import axios from '../axiosInstance';

const Login = ({ setToken, setUserId }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', { username, password });
      setToken(response.data.token);
      setUserId(username);
    } catch (err) {
      console.error(err);
      alert('Error logging in');
    }
  };

  return (
    <div className='container m-auto mt-3'>
      <form onSubmit={handleSubmit} className='container w-50 p-5 d-flex justify-content-center flex-column'>
        <div className='p-1 text-center'>
          <h2>Welcome to ChatterBox</h2>
          <h3 className=''>Login</h3>
        </div>
        <div className='p-1'>
          <input className='form-control' type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        </div>
        <div className='p-1'>
          <input className='form-control' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        </div>
        <div className='p-1'>
          <button className='btn btn-outline-primary' type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;