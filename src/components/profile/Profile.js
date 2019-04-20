import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ProfileForm from './ProfileForm';
import Followers from './Followers';
import Articles from './Articles';
import NavbarInstance from '../Navbar/Navbar';
import Footer from '../static/Footer';

const Profile = () => (
  <div>
    <header className="artcile-header">
      <NavbarInstance />
    </header>
    <Container className="container1">
      <Row>
        <Col sm={4}>
          <ProfileForm />
        </Col>
        <Col sm={8}>
          <Followers />
          <Articles />
        </Col>
      </Row>
    </Container>
    <div className="footer-space" />
    <Footer />
  </div>
);
export default Profile;
