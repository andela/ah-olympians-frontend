import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

const Follow = (props) => {
  const { following, followers } = props;
  return (
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
          <Link to="following">{following}</Link>
        </Col>
        <Col sm={2}>
          Followers
          <br />
          <Link to="followers">{followers}</Link>
        </Col>
        <Col sm={2}>
          Like
          <br />
          5
        </Col>
        <Col sm={2} />
      </Row>
    </div>
  );
};

Follow.defaultProps = {
  following: 0,
  followers: 0,
};

Follow.propTypes = {
  following: PropTypes.number,
  followers: PropTypes.number,
};

const mapStateToProp = state => ({
  following: state.following.following,
  followers: state.following.followers.followers_count,
});

const Followers = connect(mapStateToProp)(Follow);

export default Followers;
