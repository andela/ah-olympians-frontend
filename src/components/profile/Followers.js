import React from 'react';
import { Row, Col } from 'react-bootstrap';


const Followers = () => (
  <div className="profile-followers">
    <Row>
      <Col sm={2}>
      Articles
        <br />
        12
      </Col>
      <Col sm={2}>
      Favourite
        <br />
        10
      </Col>
      <Col sm={2}>
      Following
        <br />
        0
      </Col>
      <Col sm={2}>
        Followers
        <br />
        3
      </Col>
      <Col sm={2}>
        Like
        <br />
        5
      </Col>
      <Col sm={2}>

      </Col>
    </Row>
  </div>
);

export default Followers;
