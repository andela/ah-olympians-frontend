import React from 'react';
import { Link } from 'react-router-dom';
import NavbarInstance from '../Navbar/Navbar';
import Footer from '../static/Footer';
import './404.scss';
import '../../css/bootstrap.min.css';

const Page404 = () => (
  <div className="App-header">
    <header>
      <NavbarInstance />
    </header>
    <div className="notfound">
      <div className="notfound-404">
        <div />
        <h1>404</h1>
      </div>
      <h2>Page not found</h2>
      <p>
      The page you are looking for might have been removed
      had its name changed or is temporarily unavailable.
      </p>
      <Link to="/" className="link-style">
        <button type="button" className="btn btn-outline-success">Home Page</button>
      </Link>
    </div>
    <footer>
      <Footer />
    </footer>
  </div>
);

export default Page404;
