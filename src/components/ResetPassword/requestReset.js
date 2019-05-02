import { connect } from 'react-redux';
import React, { Component } from 'react';
import requestPassword from '../../actions/requestPasswordReset';
// import 'bootstrap/dist/css/bootstrap.css';
import '../Login/Login.scss';

export class RequestResetForm extends Component {
  state = { email: '', message: '', errors: '' };

  handleChange = e => {
    this.setState({
      email: e.target.value,
    });
  };

  componentWillReceiveProps(nextProps) {
    const { requestPasswordDetails } = nextProps;
    if (nextProps && nextProps.requestPasswordDetails.message) {
      this.setState({ message: requestPasswordDetails.message, errors: '' });
    } else {
      if (nextProps.requestPasswordDetails.errors)
        this.setState({ errors: requestPasswordDetails.errors });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const emailData = this.state.email;
    const data = { emailData };
    this.props.requestPassword(data);
    this.setState({ message: '', errors: '' });
  };
  render() {
    return (
      <div>
        <div className="wrapper">
          <div>
            <h1>Forgot Password</h1>
          </div>
          <div className="form-wrapper">
            <div>
              <div>
                <p className="message">
                  {this.state.message ? this.state.message : null}
                </p>

                {this.state.errors ? (
                  this.state.errors.includes('If we found an account') ? (
                    <p className="message">
                      If we found an account; we've emailed you a link to change
                      your password. Please check your email (and spam folder)
                    </p>
                  ) : (
                    <p className="errorMessage">{this.state.errors}</p>
                  )
                ) : (
                  <p className="errorMessage">{this.state.errors} </p>
                )}
              </div>
              <div className="email">
                <input
                  type="text"
                  placeholder="Enter your email address"
                  value={this.state.email}
                  name="email"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="login bubble">
                <button type="button" onClick={this.handleSubmit}>
                  send email for reset password
                </button>
              </div>
              <div className="login">
                <a href="/login">
                  {' '}
                  <small>Back to Login </small>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  requestPassword: data => dispatch(requestPassword(data)),
});
export const mapStateToProps = state => ({
  requestPasswordDetails: state.requestPassword,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequestResetForm);
