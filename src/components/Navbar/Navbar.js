import React from 'react';
import {
  Button, Container, Form, FormControl, Image, Nav, Navbar, Row,
} from 'react-bootstrap';

import authors from '../../img/authors.png';

const NavbarInstance = () => (
  <Navbar bg="light" expand="lg" className="navbar navbar-expand-lg navbar-dark bg-dark" fixed="top">
    <Image src={authors} alt="logo" width="90" responsive="true" />
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Container>
        <Row>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#top">Newest</Nav.Link>
            <Nav.Link href="#top">Technology</Nav.Link>
            <Nav.Link href="#top">Local</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Row>
      </Container>

    </Navbar.Collapse>
  </Navbar>
);

export default NavbarInstance;
