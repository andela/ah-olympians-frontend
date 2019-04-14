import { Button, Form } from 'react-bootstrap';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import Loader from './Loading';


import { editProfile, getProfile } from '../../actions/index';


class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: 'off',
      picture: '',
      message: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCLick = this.onCLick.bind(this);
    this.addFile = this.addFile.bind(this);
  }

  componentWillMount() {
    this.props.onGetProfile();
  }

  componentWillReceiveProps(nextProps) {
    try {
      if (nextProps.user.profile.profiles['Kelvin Chirchir']) {
        this.profile = nextProps.user.profile.profiles['Kelvin Chirchir'];
      }
    } catch (e) {
      if (nextProps.user.profile) {
        this.setState({
          message: 'successfully updated',
          edit: 'off',
        });
        this.profile = nextProps.user.profile
      }
    }
  }


  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  addFile(event) {
    this.setState({
      picture: event.target.files[0].name,
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const post = {
      username: this.state.username,
      bio: this.state.bio,
      interests: this.state.interest,
      website: this.state.website,
      favorite_quote: this.state.favorite,
      avatar: this.state.picture,
    };

    this.props.editProfile(post);
  }

  onCLick() {
    this.setState({
      edit: 'on',
    });
  }

  render() {
    this.renderProfile = <Loader />
    if (this.profile && this.state.edit === 'off' && this.state.message !== 'successfully updated') {
      this.renderProfile = (
        <div className="profile-edit">
          <div id="message" className="alert-success">
            {this.state.message}
          </div>
          <img
            className="profile-pic"
            src={`https://res.cloudinary.com/jumakahiga/${this.profile.avatar}`}
            alt={this.profile.username}
          />
          <br />
          <button type="button" className="EdgeButton EdgeButton--tertiary">
            <span className="button-text" onClick={this.onCLick}>Edit profile</span>
          </button>
          <b>User Name:</b>
          <br />
          {this.profile.username}
          <br />
          <b>Bio </b>
          <br />
          {this.profile.bio}
          <br />
          <b> Interests</b>
          <br />
          {this.profile.interests}
          <br />
          <b> favorite quote</b>
          <br />
          {this.profile.favorite_quote}
          <br />
          <b> website</b>
          <br />
          {this.profile.website}
          <br />
        </div>
      );
    }
    if (this.profile && this.state.edit === 'on') {
      this.renderProfile = (
        <div className="profile-edit">
          <img
            className="profile-pic"
            src={`https://res.cloudinary.com/jumakahiga/${this.profile.avatar}`}
            alt={this.profile.username}
          />
          <Form>

            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupFileAddon01">
                  Upload
                </span>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                  onChange={this.addFile}
                  name="picture"
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  Choose picture
                </label>
              </div>
            </div>
            <Form.Group controlId="password">
              <Form.Label>Username</Form.Label>
              <Form.Control onChange={this.onChange} name="username" type="text" placeholder="username" defaultValue={this.profile.username} />
            </Form.Group>

            <Form.Group controlId="bio">
              <Form.Label>Bio</Form.Label>
              <Form.Control as="textarea" onChange={this.onChange} name="bio" type="textarea" rows="4" cols="50" placeholder="Iam a graduate" defaultValue={this.profile.bio} />
            </Form.Group>

            <Form.Group controlId="interest">
              <Form.Label>Interest</Form.Label>
              <Form.Control as="textarea" onChange={this.onChange} name="interest" placeholder="Whisky" defaultValue={this.profile.interests} />
            </Form.Group>

            <Form.Group controlId="website">
              <Form.Label>Website</Form.Label>
              <Form.Control onChange={this.onChange} name="website" type="textarea" rows="4" cols="50" placeholder="Favourite Quotes" defaultValue={this.profile.website} />
            </Form.Group>

            <Form.Group controlId="quotes">
              <Form.Label>Favourite Quotes</Form.Label>
              <Form.Control as="textarea" rows="3" onChange={this.onChange} name="favorite" type="textarea" cols="50" placeholder="Favourite Quotes" defaultValue={this.profile.favorite_quote} />
            </Form.Group>


            <Button variant="primary" type="submit" className="button-submit" onClick={this.onSubmit}>
              Change
            </Button>
          </Form>
        </div>
      );
    }
    if (this.state.edit === 'off' && this.state.message === 'successfully updated') {
      this.renderProfile = (
        <div className="profile-edit">
          <img
            className="profile-pic"
            src={this.profile.avatar}
            alt={this.profile.username}
          />
          <br />
          <button type="button" className="EdgeButton EdgeButton--tertiary">
            <span className="button-text" onClick={this.onCLick}>Edit profile</span>
          </button>
          <b>User Name:</b>
          <br />
          {this.profile.username}
          <br />
          <b>Bio </b>
          <br />
          {this.profile.bio}
          <br />
          <b> Interests</b>
          <br />
          {this.profile.interests}
          <br />
          <b> favorite quote</b>
          <br />
          {this.profile.favorite_quote}
          <br />
          <b> website</b>
          <br />
          {this.profile.website}
          <br />
        </div>
      );
    }
    return (
      <div>
        {this.renderProfile}
      </div>
    );
  }
}

editProfile.propTypes = {
  editProfile: PropTypes.func,
  onGetProfile: PropTypes.func,

};

const mapDispatchToProps = dispatch => ({
  editProfile: (post) => {
    dispatch(editProfile(post));
  },
  onGetProfile: () => {
    dispatch(getProfile());
  },
});
const mapStateToProp = state => ({
  user: state.user.user_data,
});


export default connect(mapStateToProp, mapDispatchToProps)(ProfileForm);
