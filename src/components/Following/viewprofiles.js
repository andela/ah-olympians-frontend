import React, { Component } from 'react';
import {
  Image, Container, Row, Col,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfile } from '../../actions/index';
import NavbarInstance from '../Navbar/Navbar';
import Footer from '../static/Footer';
import FollowButton from './followButton';
import './style/following.scss';

class Profiles extends Component {
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
    const { userProfiles } = this.props;
    return (
      <div>
        <NavbarInstance />
        <Container>
          <div className="row page-top">
            <div className="col-sm-2" />
            <div className="col-sm-8">
              <h2 className="text-center page-header">User Profiles</h2>
              {Object.keys(userProfiles).map(key => (
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
                          <p className="lead">{userProfiles[key].interests}</p>
                        </Col>
                        <Col className="d-flex align-items-center">
                          {user.username === key ? (
                            ''
                          ) : (
                            <FollowButton
                              followStatus={userProfiles[key].following}
                              userId={userProfiles[key].username_id}
                            />
                          )}
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-sm-2" />
          </div>
        </Container>
        <div className="footer-space" />
        <Footer />
      </div>
    );
  }
}

Profiles.defaultProps = {
  getUProfile: '',
  userProfiles: {},
};

Profiles.propTypes = {
  getUProfile: PropTypes.func,
  userProfiles: PropTypes.shape({}),
};

const mapDispatchToProps = dispatch => ({
  getUProfile: () => dispatch(getProfile()),
});

const mapStateToProp = state => ({
  userProfiles: state.user.user_data.profile.profiles,
});

const ViewProfiles = connect(mapStateToProp, mapDispatchToProps)(Profiles);

export default ViewProfiles;
