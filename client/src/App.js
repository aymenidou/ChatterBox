import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const App = () => {

  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/" >Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>

      </div>
    </Router>
  );
};

export default App;
