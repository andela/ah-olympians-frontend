import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import loginAction from '../../actions/index';
import './Login.scss';

const emailRegex = RegExp(/(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/);

const passwordRegex = RegExp(/^(?=.*[A-Za-z].*)(?=.*[0-9].*)[A-Za-z0-9]{8,}$/);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      formErrors: {
        email: '',
        password: '',
      },
      show: false,
      errors: '',
    };
    this.onAlertClose = this.onAlertClose.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.user.errors) {
      newProps.history.push('/');
    }
    const { errors } = newProps.user;
    this.setState({
      errors,
      show: true,
    });
  }

  onAlertClose() {
    this.setState({
      show: false,
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    if (formValid(this.state)) {
      const { email, password } = this.state;
      this.props.loginAction(email, password);
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    const { formErrors } = this.state;
    switch (name) {
      case 'email':
        formErrors.email = emailRegex.test(value)
          ? ''
          : 'invalid email address';
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  render() {
    const { formErrors, errors } = this.state;

    return (
      <div>
        <div className="wrapper">
          <p className="text-right">
            Not Registered ?{' '}
            <a href={'/register'} variant="link">
              Click to Register
            </a>
          </p>
          <Alert
            dismissible
            variant="danger"
            show={this.state.show}
            onClick={this.onAlertClose}
          >
            <Alert.Heading>
              <small>{errors}</small>
            </Alert.Heading>
          </Alert>
          <h1>Login</h1>
          <br />
          <div className="form-wrapper">
            <form onSubmit={this.handleSubmit} noValidate>
              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  className={formErrors.email.length > 0 ? 'error' : null}
                  placeholder="Email"
                  type="email"
                  name="email"
                  id="email"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.email.length > 0 && (
                  <span className="errorMessage">{formErrors.email}</span>
                )}
              </div>
              <div className="password">
                <label htmlFor="password">Password</label>
                <input
                  // className={formErrors.password.length > 0 ? 'error' : null}
                  placeholder="Password"
                  type="password"
                  name="password"
                  id="password"
                  noValidate
                  onChange={this.handleChange}
                />
                {/*{formErrors.password.length > 0 && (*/}
                {/*  <span className="errorMessage">{formErrors.password}</span>*/}
                {/*)}*/}
              </div>
              <div className="login">
                <button id="submit" type="submit">
                  Login
                </button>
                <a href={'/resetpassword'} variant="link">
                  <small>Forgot password?</small>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.login,
});

export default connect(
  mapStateToProps,
  { loginAction },
)(Login);
