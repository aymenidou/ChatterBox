import React, { useState } from 'react';
import axios from '../axiosInstance';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', { username, password });
      alert('User registered successfully');
    } catch (err) {
      console.error(err);
      alert('Error registering user');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Register</h3>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;