import React, { Component } from 'react';
import { connect } from 'react-redux';

import Alert from '@material-ui/lab/Alert';


class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  handleSignIn = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.history.push("/home");
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
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

  render() {
    return (
      <div className='content-page'>
        
        <form onSubmit={this.handleSignIn}>
        {this.props.errors.loginMessage && (
          <Alert severity="error"> {this.props.errors.loginMessage}</Alert>
        )}
          <h1>Sign in</h1>
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
              className="log-in"
              type="submit"
              name="submit"
              value="Log In"
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
