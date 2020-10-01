import React, { Component } from 'react';
import { connect } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import GoogleLogin from 'react-google-login'

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    email: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.history.push("/home");

      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,

        },
      });
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  } // end registerUser
  handleSignIn = () => {
    this.props.history.push("/sign-in");
  }
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }
  responseGoogle = (response) => {
    this.props.history.push("/home");
    this.props.dispatch({
      type: 'REGISTER',
      payload: {
        username: response.profileObj.email,
        password: response.profileObj.googleId,
        name: response.profileObj.name,
      },
    });
  }

  render() {
    return (
      <div className='content-page'>

        <form onSubmit={this.registerUser}>
          {this.props.errors.registrationMessage && (
            <Alert severity="error"> {this.props.errors.registrationMessage}</Alert>
          )}
          <h1>Sign up FREE</h1>
          <div>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <input
              className="register"
              type="submit"
              name="submit"
              value="Register"
            />
            <p>________________or________________</p>
            <GoogleLogin
              clientId="657071721957-uur1g143dko5qi1v2p33v9r1cfs4dhus.apps.googleusercontent.com"
              buttonText="Sign up with Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={'single_host_origin'}
             
            />
          </div>
        </form>
        <center>
          <button
            type="button"
            className="link-button"
            onClick={this.handleSignIn}
          >
            Already have an account?
          </button>
        </center>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

