import { connect } from 'react-redux';
import React, { Component } from 'react';
import { resetPassword } from '../../actions/resetPassword';
import 'bootstrap/dist/css/bootstrap.css';
import '../Login/Login.scss';


export class ResetPassword extends Component {
  state = { password: '', confirmPassword: '', message: true, error: true ,loading:true};

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    if (e.target.id === 'password') {
      if (e.target.value.length === 0) {
        this.setState({ error: true });
        this.setState({ message: 'Password cannot be empty' });
        return;
      }
      if (!this.validatePassword(e.target.value)) {
        this.setState({ error: true });
        this.setState({
          message:
            'Password should be atleast 8 characters with a capital letter, a small letter and a number',
        });
        return;
      }
    }
    if (e.target.id === 'confirmPassword') {
      if (e.target.value !== this.state.password) {
        this.setState({ error: true });
        this.setState({ message: 'Passwords do not match' });
        return;
      } else {
        this.setState({ error: null, message: null });
      }
    } else {
      this.setState({ error: null, message: null });
    }
  };

  validatePassword = password => {
    const valid = password.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    );
    return valid;
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      const passwordData = this.state.password;
      const data = { password: passwordData };
      this.props.resetPassword(data);
    } else {
      this.setState({ message: "Passwords didn't match" });
    }
  };

  render() {
    return (
      <div>
        <div>
          <div className="wrapper">
            <div>
              <h1>Reset Password</h1>
            </div>
            <div className="form-wrapper">
              <div>
                <div className="errorMessage">
                 
                
                  {this.state.message && (
                 
                    <p >
                      {this.state.message}
                    </p>
                  )}
                </div>
                <div className="password">
                <input
                  type="password"
                  id="password"
                  placeholder="Enter New Password"
                  value={this.state.password}
                  name="password"
                  onChange={this.handleChange}
                  required
                  />
                </div>
                <div className="password">
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder=" Enter Confirm Password"
                  value={this.state.confirmPassword}
                  name="confirmpassword"
                  onChange={this.handleChange}
                  required
                  />
                </div>
                <div className="login1">
                <button
                  disabled={this.state.error ? 'true' : null}
                  type="button"
                  className="login1"
                  onClick={this.handleSubmit}
                >
                  Reset Password
                  </button>
                  </div>
                <h2>{this.token}</h2>
              </div>
            </div>
          </div>
        </div>
        </div>
     
    );
  }
}

export const mapStateToProps = state => ({ passwordReset: state.resetPassword });
export default connect(
  mapStateToProps,
  { resetPassword },
)(ResetPassword);
