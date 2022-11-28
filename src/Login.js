import React from "react";
import "./Stylesheets/index.css";
import { ReactComponent as CDLogo } from "./images/Logo.svg";
import PrimaryButton from "./Components/PrimaryButton";
import TextField from "./Components/TextField";
import FormDelegate from "./FormDelegate";

class LoginPage extends FormDelegate {
  constructor(props) {
    super(props);

    this.state = { loginFailed: false };

    this.primaryButtonClicked = this.primaryButtonClicked.bind(this);
    this.onSignupLink = this.onSignupLink.bind(this);
    this.submitData = this.submitData.bind(this);
    this.sendLogin = this.sendLogin.bind(this);
    this.loginFailedExpression = this.loginFailedExpression.bind(this);
  }

  primaryButtonClicked(button) {
    if (
      typeof this.fields["Username or Email"] === "string" ||
      typeof this.fields["Password"] === "string"
    ) {

    } else {
      let username = this.fields["Username or Email"].getValue();
      let pass = this.fields["Password"].getValue();
      let obj = {};
      obj["username"] = username;
      obj["password"] = pass;
      this.sendLogin(obj).then((response) => {

        if (response.success) {
          this.setState({ loginFailed: false });
          this.props.appendData(response);
          this.props.changePage("dashboard");
        } else {
          this.setState({ loginFailed: true });
        }
      });
    }
  }

  async sendLogin(obj) {
    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    return response.json();
  }

  onSignupLink(event) {
    this.props.changePage("signup");
  }

  loginFailedExpression() {
    if (this.state.loginFailed) {
      return <p className="warning">Incorrect username or password.</p>;
    }
    return <div></div>;
  }

  render() {
    return (
      <div className="background">
        <div className={"logo-container"}>
          <CDLogo className="logo" />
        </div>
        <div className="tile">
          <h1 className="primary-header">Log In</h1>
          <TextField
            label="Username or Email"
            isSecure={false}
            fields={this.fields}
          />
          <TextField label="Password" isSecure={true} fields={this.fields} />
          <PrimaryButton label="Log in" onClick={this.primaryButtonClicked} />
          <p className="paragraph">
            Not already a user?{" "}
            <a className="login-link" onClick={this.onSignupLink}>
              Sign Up
            </a>
          </p>
          {this.loginFailedExpression()}
        </div>
      </div>
    );
  }
}

export default LoginPage;
