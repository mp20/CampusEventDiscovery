import React from "react";
import "./Stylesheets/index.css";
import { ReactComponent as CDLogo } from "./images/Logo.svg";
import PrimaryButton from "./Components/PrimaryButton";
import TextField from "./Components/TextField";
import FormDelegate from "./FormDelegate";

class SignupPage extends FormDelegate {
  constructor(props) {
    super(props);

    this.primaryButtonClicked = this.primaryButtonClicked.bind(this);
    this.onLoginLink = this.onLoginLink.bind(this);
    this.submitData = this.submitData.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
  }

  primaryButtonClicked(button) {
    try {
      this.submitData();
      this.props.changePage("bio");
    } catch (error) {
      // Could not submit since all fields were not valid.
    }
  }

  checkPassword(str) {


    return str == this.fields["Password"].getValue();
  }

  onLoginLink(event) {
    this.props.changePage("login");
  }

  render() {
    return (
      <div className="background">
        <div className={"logo-container"}>
          <CDLogo className="logo" />
        </div>
        <div className="tile">
          <h1 className="primary-header">Sign Up</h1>
          <TextField
            label="Username"
            check="Username"
            isSecure={false}
            fields={this.fields}
          />
          <TextField
            label="Email"
            check="Email"
            isSecure={false}
            fields={this.fields}
          />
          <TextField
            label="Password"
            check="Password"
            isSecure={true}
            fields={this.fields}
            delegate={this}
          />
          <TextField
            label="Confirm Password"
            check="Confirm Password"
            checkPassword={this.checkPassword}
            isSecure={true}
            fields={this.fields}
            delegate={this}
          />
          <PrimaryButton label="Sign up" onClick={this.primaryButtonClicked} />
          <p className="paragraph">
            Already a user?{" "}
            <a className="login-link" onClick={this.onLoginLink}>
              Log in
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default SignupPage;
