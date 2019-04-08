import React from 'react';
import NavbarInstance from '../Navbar/Navbar';
import Footer from '../static/Footer';
import './Home.scss';

const App = () => (
  <div className="App">
    <NavbarInstance />
    <header className="App-header">
      <p>WELCOME TO AUTHORS HAVEN</p>
    </header>
    <Footer />
  </div>
);

export default App;
