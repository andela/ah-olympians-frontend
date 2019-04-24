import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import NotificationBadge from '../NotificationBadge/NotificationBadge';
import getNotifications from '../../actions/notifications.actions';

let user = {};

if (localStorage.getItem('user')) {
  user = JSON.parse(localStorage.getItem('user'));
}

export class DropdownComponent extends Component {
  componentWillMount() {
    // console.log(this.props);
    this.props.notifications();
  }

  render() {
    return (
      <div className="d-flex align-items-center justify-content-end">
        <NotificationBadge />
        <NavDropdown title={user.user ? user.user.username : ''} id="basic-nav-dropdown">
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
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  notifications: () => dispatch(getNotifications()),
});

const Dropdown = connect(
  null,
  mapDispatchToProps,
)(DropdownComponent);
export default Dropdown;
