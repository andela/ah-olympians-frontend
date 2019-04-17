import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import {
  registerUser,
  submitStatus,
  registerSuccess,
} from '../../actions/index';
import Footer from '../static/Footer';
import './register.scss';

class Signup extends Component {
  constructor() {
    super();

    this.state = {
      user: {
        username: '',
        email: '',
        password: '',
      },
      formErrors: {
        username: '',
        email: '',
        password: '',
      },
      validated: false,
      conPassword: '',
      confirmed_pass: true,
    };
  }

  validateInput = input => {
    const emailRegex = RegExp(
      /(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/,
    );
    const passwordRegex = RegExp(
      /^(?=.*[A-Za-z].*)(?=.*[0-9].*)[A-Za-z0-9]{8,}$/,
    );
    const usernameRegex = RegExp(/(^[a-zA-Z][A-Za-z0-9]{3,}$)/);
    const formData = this.state.user;
    const formErrors = this.state.formErrors;
    switch (input) {
      case 'username':
        formErrors.username = usernameRegex.test(formData.username)
          ? undefined
          : 'username should be alphanumeric, start with letter and more than 3 characters';
        break;
      case 'email':
        formErrors.email = emailRegex.test(formData.email)
          ? undefined
          : 'invalid email address';
        break;
      case 'password':
        formErrors.password = passwordRegex.test(formData.password)
          ? undefined
          : 'password should be alphanumeric and not less than 8 characters';
        break;
      default:
        break;
    }

    const confirmed = this.state.confirmed_pass;

    if (
      formErrors.username !== undefined ||
      formErrors.email !== undefined ||
      formErrors.password !== undefined ||
      !confirmed
    ) {
      this.setState({ validated: false });
    } else if (
      formData.username === undefined ||
      formData.email === undefined ||
      formData.password === undefined
    ) {
      this.setState({ validated: false });
    } else {
      this.setState({ validated: true });
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    const { user } = this.state;
    user[name] = value;
    this.setState({ user: user });
    if (this.state.conPassword !== this.state.user.password) {
      this.setState({ confirmed_pass: false }, () => this.validateInput(name));
    } else {
      this.setState({ confirmed_pass: true }, () => this.validateInput(name));
    }
  };

  handleConfirmPass = event => {
    const { name, value } = event.target;
    this.setState({ conPassword: value });
    if (value !== this.state.user.password) {
      this.setState({ confirmed_pass: false }, () => this.validateInput(name));
    } else {
      this.setState({ confirmed_pass: true }, () => this.validateInput(name));
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      this.setState({ validated: false });
      event.stopPropagation();
    } else {
      this.setState({ validated: true });
      this.props.submitStatus(false);
      this.props.registerUser(this.state.user);
    }
  };

  render() {
    const { validated } = this.state;
    return (
      <div>
        <Container>
          <p className="text-center page-top">
            Already Registered?{' '}
            <Button href={'/login'} variant="link">
              Login
            </Button>
          </p>
          <div
            className={`alert alert-dismissible alert-success text-center ${
              this.props.successful ? '' : 'd-none'
            }`}
          >
            <button type="button" className="close" data-dismiss="alert">
              &times;
            </button>
            <strong>Registration successful! You can now login</strong>
          </div>
          <h2 className="text-center page-header">User Registration</h2>
          <Row>
            <Col sm={3} md={4} />
            <Col sm={4} className="center-col">
              <Form
                id="register_form"
                validated={validated}
                onSubmit={this.handleSubmit}
              >
                <Form.Group as={Row} controlId="username">
                  <Form.Label column sm={12}>
                    Username:
                  </Form.Label>
                  <Col sm={12}>
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Enter Username"
                      required
                      value={this.state.user['username']}
                      onChange={this.handleChange}
                    />
                    <div className="text-danger">
                      {this.props.errors['username'][0]}
                      {this.state.formErrors.username}
                    </div>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="email" className="has-success">
                  <Form.Label column sm={12}>
                    Email:
                  </Form.Label>
                  <Col sm={12}>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      required
                      value={this.state.user['email']}
                      onChange={this.handleChange}
                    />
                    <div className="text-danger">
                      {this.props.errors['email'][0]}
                      {this.state.formErrors.email}
                    </div>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="password">
                  <Form.Label column sm={12}>
                    Password:
                  </Form.Label>
                  <Col sm={12}>
                    <Form.Control
                      type="password"
                      placeholder="************"
                      name="password"
                      required
                      value={this.state.user['password']}
                      onChange={this.handleChange}
                    />
                    <div className="text-danger">
                      {this.props.errors['password'][0]}
                      {this.state.formErrors.password}
                    </div>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="conPassword">
                  <Form.Label column sm={12}>
                    Confirm Password:
                  </Form.Label>
                  <Col sm={12}>
                    <Form.Control
                      type="password"
                      name="conPassword"
                      required
                      value={this.state.conPassword}
                      onChange={this.handleConfirmPass}
                    />
                    <div className="text-danger">
                      {this.state.confirmed_pass
                        ? ''
                        : 'Password does not match!'}
                    </div>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Col>
                    <i
                      className={`fa fa-spinner fa-spin ${
                        this.props.submittable ? 'd-none' : ''
                      }`}
                    />
                  </Col>
                  <Col />
                  <Col>
                    <button
                      className="btn btn-success"
                      disabled={
                        this.props.submittable && validated ? '' : 'disabled'
                      }
                      variant="info"
                      type="submit"
                    >
                      Register{' '}
                    </button>
                  </Col>
                </Form.Group>
              </Form>
            </Col>
            <Col sm={3} md={4} />
          </Row>
        </Container>
        <div className="footer-space" />
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    registerUser: user => dispatch(registerUser(user)),
    submitStatus: submittable => dispatch(submitStatus(submittable)),
    registerSuccess: successful => dispatch(registerSuccess(successful)),
  };
};

const mapStateToProps = state => {
  return {
    user: state.registerUser.user,
    errors: state.registerUser.errors,
    submittable: state.registerUser.submittable,
    successful: state.registerUser.successful,
  };
};

const Register = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);

export default Register;
