import React from 'react';
import NavbarInstance from '../Navbar/Navbar';
import './Home.scss';
import '../../css/bootstrap.min.css';

const App = () => (
  <div className="App">
    <header className="App-header">
      <NavbarInstance />
      <p>WELCOME TO AUTHORS HAVEN</p>
    </header>
  </div>
);

export default App;
