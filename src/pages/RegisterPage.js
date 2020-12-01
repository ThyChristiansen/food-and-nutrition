import React, { Component } from "react";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import GoogleLogin from "react-google-login";
import { Button, Container, TextField, withStyles } from "@material-ui/core";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    textAlign: "center",
    width: "40%",
    display: "block",
  },
});

class RegisterPage extends Component {
  state = {
    password: "",
    email: "",
  };

  registerUser = (event) => {
    event.preventDefault();
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(this.state.email)) {
      alert("Please provide a valid email address");
    } else if (this.state.email && this.state.password) {
      this.props.history.push("/home");
      this.props.dispatch({
        type: "REGISTER",
        payload: {
          username: this.state.email,
          password: this.state.password,
          name: "",
        },
      });
    } else {
      this.props.dispatch({ type: "REGISTRATION_INPUT_ERROR" });
    }
  }; // end registerUser

  handleSignIn = () => {
    this.props.history.push("/sign-in");
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value.trim(),
    });
  };

  responseGoogle = (response) => {
    this.props.history.push("/home");
    this.props.dispatch({
      type: "REGISTER",
      payload: {
        username: response.profileObj.email,
        password: response.profileObj.googleId,
        name: response.profileObj.name,
      },
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Container maxWidth="md" className={classes.root}>
        {" "}
        <form onSubmit={this.registerUser}>
          {this.props.errors.registrationMessage && (
            <Alert severity="error">
              {" "}
              {this.props.errors.registrationMessage}
            </Alert>
          )}
          <h1>Sign up FREE</h1>
          <div>
            <TextField
              type="text"
              name="email"
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
            <Button
              type="submit"
              name="submit"
              value="Sign Up"
              variant="contained"
              color="primary"
            >
              Sign up
            </Button>

            <p>________________or________________</p>
            <GoogleLogin
              clientId={process.env.REACT_APP_CLIENT_ID}
              buttonText="Sign up with Google"
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
          onClick={this.handleSignIn}
        >
          Already have an account?
        </button>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
});
export default connect(mapStateToProps)(withStyles(useStyles)(RegisterPage));
