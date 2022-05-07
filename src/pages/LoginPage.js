import React, { Component } from "react";
import { connect } from "react-redux";
import GoogleLogin from "react-google-login";
import Alert from "@mui/material/Alert";
import { Button, Container, TextField } from "@mui/material";
import { withStyles } from "@mui/styles";

const useStyles = (theme) => ({
  root: {
    marginTop: "20vh",
    textAlign: "center",
    width: "40%",
    display: "block",
  },
});

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
  };

  handleSignIn = (event) => {
    event.preventDefault();
    if (this.state.email && this.state.password) {
      this.props.dispatch({
        type: "LOGIN",
        payload: {
          username: this.state.email,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end handleSignIn

  handleSignUp = () => {
    this.props.history.push("/sign-up");
  };
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value.trim(),
    });
  };
  responseGoogle = (response) => {
    this.props.dispatch({
      type: "LOGIN",
      payload: {
        username: response.profileObj.email,
        password: response.profileObj.googleId,
      },
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Container maxWidth="md" className={classes.root}>
        <form onSubmit={this.handleSignIn}>
          {this.props.errors.loginMessage && (
            <Alert severity="error"> {this.props.errors.loginMessage}</Alert>
          )}
          <h1>Sign in</h1>
          <div>
            <TextField
              type="text"
              // name="email"
              label="Email"
              value={this.state.email}
              onChange={this.handleInputChangeFor("email")}
            />
          </div>
          <div>
            <TextField
              type="password"
              name="password"
              label="Password"
              value={this.state.password}
              onChange={this.handleInputChangeFor("password")}
            />
          </div>
          <br />
          <div>
            <Button type="submit" name="submit" value="Sign In"  variant="contained" color="primary">
              Sign in
            </Button>

            <p>________________or________________</p>
            <GoogleLogin
              clientId={process.env.REACT_APP_CLIENT_ID}
              buttonText="Sign in with Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </form>
        <br />
        <button
          type="button"
          className="link-button"
          onClick={this.handleSignUp}
        >
          Have not an account ?
        </button>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(withStyles(useStyles)(LoginPage));
