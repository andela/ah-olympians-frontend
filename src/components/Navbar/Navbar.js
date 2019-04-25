import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Form,
  FormControl,
  Image,
  Nav,
  Navbar,
  NavItem,
} from 'react-bootstrap';
import AuthButtons from '../static/auth-buttons';
import Dropdown from '../static/dropdown';
import logo from '../../img/logo.png';
import './navbar.scss';

const NavbarObject = (props) => {
  const { loggedIn } = props;
  return (
    <Navbar
      bg="light"
      expand="lg"
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      fixed="top"
    >
      <Image src={logo} alt="logo" className="navbar-brand" responsive="true" />
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Container>
          <div className="row">
            <div className="col-sm-2 col-0" />
            <div className="col-sm-7 col-12">
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="col-sm-8 col-md-9 col-12"
                />
                <Button
                  className="btn col-sm-4 col-md-3 col-12"
                  variant="outline-success"
                >
                  <i className="fa fa-search" />
                  Search
                </Button>
              </Form>
            </div>
            <div className="col-sm-3 col-12 d-flex align-items-center justify-content-end">
              {loggedIn ? <Dropdown /> : <AuthButtons />}
            </div>
          </div>
          <br />
          <div>
            <Nav
              fill
              variant="pills"
              className="justify-content-center mr-auto"
            >
              <NavItem>
                <Link to="/" className="active nav-link">
                  Home
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/" className="nav-link">
                  Newest
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/" className="nav-link">
                  Technology
                </Link>
              </NavItem>
              <NavItem>
                {loggedIn ? (
                  <Link to="/profiles" className="nav-link">
                    Profiles
                  </Link>
                ) : (
                  ''
                )}
              </NavItem>
            </Nav>
          </div>
        </Container>
      </Navbar.Collapse>
    </Navbar>
  );
};

NavbarObject.defaultProps = {
  loggedIn: false,
};

NavbarObject.propTypes = {
  loggedIn: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const { login } = state;
  return {
    loggedIn: login.loggedIn,
  };
};

const NavbarInstance = connect(mapStateToProps)(NavbarObject);

export default NavbarInstance;