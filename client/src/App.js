import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Chat from './components/Chat';
import { Link } from 'react-router-dom';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
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
        {token ?
          (<nav className='navbar navbar-expand-lg navbar-light bg-dark'>
            <div className="container-fluid">
              <div className="navbar-brand text-white App-logo" >ChatterBox</div>

            </div>
          </nav>)
          :
          (<nav className='navbar navbar-expand-lg navbar-light bg-dark'>
            <div className="container-fluid">
              <div className="navbar-brand text-white App-logo" >ChatterBox</div>
              <button className="navbar-toggler btn btn-secondary bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">

                  <li className="nav-item">
                    <Link className='nav-link text-white' to="/login" >Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className='nav-link text-white' to="/register" >Register</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>)


        }

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
