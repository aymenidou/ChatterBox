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
    <div className='container  m-auto mt-3'>

      <form onSubmit={handleSubmit} className='container w-50 p-5 d-flex justify-content-center flex-column bg-'>
        <div className='p-1'>

          <h3>Register</h3>
        </div>
        <div className='p-1'>
          <input className='form-control' type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        </div>
        <div className='p-1'>
          <input className='form-control' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        </div>
        <div className='p-1'>
          <button type="submit" className='btn btn-outline-success'>Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;