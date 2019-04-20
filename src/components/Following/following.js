import React, { Component } from 'react';
import {
  Image, Container, Row, Col,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProfile } from '../../actions/index';
import NavbarInstance from '../Navbar/Navbar';
import Footer from '../static/Footer';
import FollowButton from './followButton';
import './style/following.scss';

class Follow extends Component {
  constructor() {
    super();
    this.userDetails = JSON.parse(localStorage.getItem('user'));
  }

  componentWillMount() {
    const { getUProfile } = this.props;
    getUProfile();
  }

  render() {
    const { user } = this.userDetails;
    const { userProfiles, following, followers } = this.props;
    const { avatar } = userProfiles[user.username] || '';
    return (
      <div>
        <NavbarInstance />
        <Container>
          <div className="row page-top">
            <div className="col-sm-4">
              <div className="column-top text-center border-primary mb-3">
                <Image
                  src={`https://res.cloudinary.com/jumakahiga/${avatar}`}
                  alt="logo"
                  className="rounded-circle mx-auto d-block img-fluid"
                />
                <br />
                <h5 className="text-center p-2">
                  <i>{user.username}</i>
                </h5>
                <Row>
                  <Col>
                    <Link to="/followers" className="btn btn-success btn-lg">
                      Followers
                    </Link>
                    <br />
                    <strong>{followers}</strong>
                  </Col>
                  <Col>
                    <Link to="/following" className="btn btn-info btn-lg">
                      Following
                    </Link>
                    <br />
                    <strong>{following}</strong>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="col-sm-8">
              <h2 className="text-center page-header">Following</h2>
              {Object.keys(userProfiles)
                .filter(key => userProfiles[key].following === true)
                .map(key => (
                  <div key={key} className="card bg-light border-success mb-3">
                    <div className="card-header">
                      <h5 className="text-center">{key}</h5>
                    </div>
                    <div className="row">
                      <div className="col-sm-4">
                        <Image
                          src={`https://res.cloudinary.com/jumakahiga/${
                            userProfiles[key].avatar
                          }`}
                          alt="logo"
                          className="rounded mx-auto d-block img-fluid"
                        />
                      </div>
                      <div className="col-sm-8">
                        <br />
                        <Row className="text-center">
                          <Col>
                            <h6 className="text-center">
                              <strong>Interests</strong>
                            </h6>
                            <p className="lead">
                              {userProfiles[key].interests}
                            </p>
                          </Col>
                          <Col className="d-flex align-items-center">
                            <FollowButton
                              followStatus={userProfiles[key].following}
                              userId={userProfiles[key].username_id}
                            />
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Container>
        <div className="footer-space" />
        <Footer />
      </div>
    );
  }
}

Follow.defaultProps = {
  getUProfile: '',
  userProfiles: {},
  following: 0,
  followers: 0,
};

Follow.propTypes = {
  getUProfile: PropTypes.func,
  userProfiles: PropTypes.shape({}),
  following: PropTypes.number,
  followers: PropTypes.number,
};

const mapDispatchToProps = dispatch => ({
  getUProfile: () => dispatch(getProfile()),
});

const mapStateToProp = state => ({
  userProfiles: state.user.user_data.profile.profiles,
  following: state.following.following,
  followers: state.following.followers.followers_count,
});

const Following = connect(mapStateToProp, mapDispatchToProps)(Follow);

export default Following;
