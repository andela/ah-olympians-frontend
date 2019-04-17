import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SocialButton from '../socialbutton/index';
import './styles.scss';
import axios from 'axios';

class SocialAuth extends Component {
  state = {
    error: null,
    isLoading: false,
  };

  handleSocialLogin = user => {
    if (user) {
      const provider =
        user._provider === 'google' ? 'google-oauth2' : 'facebook';
      this.setState({ isLoading: true });

      const data = {
        provider,
        access_token: user._token.accessToken,
        access_token_secret: '',
      };
      axios
        .post('https://aholympian.herokuapp.com/api/convert_token/', {
          ...data,
        })
        .then(data => {
          localStorage.setItem('user', JSON.stringify(data));
          this.props.history.push('/');
        })
        .catch(({ error }) => {
          this.setState({ error, isLoading: false });
        });
    }
  };
  handleSocialLoginFailure = () => {
    this.setState({
      error: 'Something went wrong',
    });
  };

  renderLoginButton = (provider, appId, content) => {
    return (
      <SocialButton
        className={`waves-effect waves-light btn-flat btn--default m-b--15 button social-button ${provider}`}
        provider={provider}
        appId={appId}
        onLoginSuccess={this.handleSocialLogin}
        onLoginFailure={this.handleSocialLoginFailure}
      >
        {content}
      </SocialButton>
    );
  };

  renderCard = () => {
    return (
      <div className="novak">
        <div>
          <h5>or</h5>
          <div />
          <div className="social-button">
            {this.renderLoginButton(
              'google',
              '65389949271-4f0q4jmvfh4fh6tr3jldvrrpdrjcdv7g.apps.googleusercontent.com',
              'Sign with Google',
            )}
          </div>
          <br />
          <br />
          <div className="social-button">
            {this.renderLoginButton(
              'facebook',
              '388837494997867',
              'Sign In With Facebook',
            )}
          </div>
        </div>
      </div>
    );
  };
  render() {
    return (
      <div>
        <div>{this.renderCard()}</div>
      </div>
    );
  }
}

SocialAuth.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default SocialAuth;
