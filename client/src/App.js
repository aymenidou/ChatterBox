import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Chat from './components/Chat';
import { Link } from 'react-router-dom';
import './App.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUserId] = useState(localStorage.getItem('username') || '');

  const handleSetToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };
  const handleSetUserId = (newUserId) => {
    setUserId(newUserId);
    localStorage.setItem('username', newUserId);
  };

  return (
    <Router>
      <div className="App">
        {token ? <nav>
          
        </nav>
          :
          <nav>
            <Link to="/" >Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </nav>}

        <Switch>
          <Route path="/register">
            {token ? <Chat token={token} username={username} /> : <Register />}
          </Route>
          <Route path="/login">
            {token ? <Chat token={token} username={username} /> : <Login setToken={handleSetToken} setUserId={handleSetUserId} />}
          </Route>
          <Route path="/chat">
            {token ? <Chat token={token} username={username} /> : <Login setToken={handleSetToken} setUserId={handleSetUserId} />}
          </Route>
          <Route path="/">
            {token ? <Chat token={token} username={username} /> : <Login setToken={handleSetToken} setUserId={handleSetUserId} />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
