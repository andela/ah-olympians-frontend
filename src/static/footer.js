import React, { Component } from 'react';
import './footer.css';

class Footer extends Component {
  render() {
    return (
      <footer className="bg-dark page-footer font-small blue">
        <div className="footer-copyright text-center py-3">
          All Rights Reserved
          <br />
          Authors Haven
          <br />
          © 2019
          <br />
        </div>
      </footer>
    );
  }
}

export default Footer;
