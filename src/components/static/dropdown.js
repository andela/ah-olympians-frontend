import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

const DropdownComponent = (props) => {
  const { loggedInUser } = props;
  return (
    <NavDropdown title={loggedInUser.username} id="basic-nav-dropdown">
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
};

DropdownComponent.propTypes = {
  loggedInUser: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => {
  const { login } = state;
  return {
    loggedInUser: login.user,
  };
};

const Dropdown = connect(mapStateToProps)(DropdownComponent);

export default Dropdown;
