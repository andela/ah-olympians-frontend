import React from 'react';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

let user = {};

if (localStorage.getItem('user')) {
  setTimeout(() => {
    user = JSON.parse(localStorage.getItem('user'));
  }, 3000);
}
const Dropdown = () => (
  <NavDropdown title={user.user.username} id="basic-nav-dropdown">
    <Link className="dropdown-item" to="/articles/new">
      <i className="fa fa-plus">&nbsp;</i>
      Create Article
    </Link>
    <Link className="dropdown-item" to="/profile">
      <i className="fa fa-user">&nbsp;</i>
      Profile
    </Link>
    <NavDropdown.Divider />
    <a className="dropdown-item" href="/login">
      <i className="fa fa-power-off">&nbsp;</i>
      Logout
    </a>
  </NavDropdown>
);

export default Dropdown;
