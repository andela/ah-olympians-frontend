import React from 'react';
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

import logo from '../../img/logo.png';
import './navbar.scss';

const NavbarInstance = () => (
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
            <a href="login" className="btn btn-secondary p-2">
              Login
            </a>
            &nbsp; &nbsp;
            <a href="register" className="btn btn-secondary p-2">
              Register
            </a>
          </div>
        </div>
        <br />
        <div>
          <Nav fill variant="pills" className="justify-content-center mr-auto">
            <NavItem>
              <Nav.Link href="#home" className="active">
                Home
              </Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link href="#top">Newest</Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link href="#top">Technology</Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link href="#top">Local</Nav.Link>
            </NavItem>
          </Nav>
        </div>
      </Container>
    </Navbar.Collapse>
  </Navbar>
);

export default NavbarInstance;
