import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login'

import Alert from '@material-ui/lab/Alert';


class LoginPage extends Component {
  state = {
    email: '',
    password: '',
  };

  handleSignIn = (event) => {
    event.preventDefault();

    if (this.state.email && this.state.password) {
      this.props.history.push("/home");
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.email,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end handleSignIn

  handleSignUp = () => {
    this.props.history.push("/sign-up");
  }
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }
  responseGoogle = (response) => {
    this.props.history.push("/home");
    this.props.dispatch({
      type: 'LOGIN',
      payload: {
        username: response.profileObj.email,
        password: response.profileObj.googleId,
      },
    });
  }

  render() {
    console.log(process.env.CLIENT_ID)

    return (
      <div className='content-page'>

        <form onSubmit={this.handleSignIn}>
          {this.props.errors.loginMessage && (
            <Alert severity="error"> {this.props.errors.loginMessage}</Alert>
          )}
          <h1>Sign in</h1>
          <div>
            <label htmlFor="email">
              Email:
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChangeFor('email')}
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
              className="log-in"
              type="submit"
              name="submit"
              value="Log In"
            />
            <p>________________or________________</p>
            <GoogleLogin
              clientId="657071721957-uur1g143dko5qi1v2p33v9r1cfs4dhus.apps.googleusercontent.com"
              buttonText="Login with Google"
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
            onClick={this.handleSignUp}
          >
            Have not an account ?
          </button>
        </center>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
