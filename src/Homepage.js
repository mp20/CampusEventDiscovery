import React, { Component } from "react";
import "./Stylesheets/index.css";
import { ReactComponent as CDLogo } from "./images/Logo.svg";
import PrimaryButton from "./Components/PrimaryButton";
import AttendeesPopup from "./AttendeesPopup";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.primaryButtonClicked = this.primaryButtonClicked.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  primaryButtonClicked(buttonName) {
    if (buttonName == "Log in") {
      this.props.changePage("login");
    } else if (buttonName == "Sign up") {
      this.props.changePage("signup");
    }
  }

  /**
  * Submits the data to the delegate (the application).
  */
  submitData() {
    let data = {};
    for (const entry of this.fields) {
      let field = this.fields[entry];
      if (typeof field.isValid() === "string") {
        // HANDLE NOT CORRECT
        throw "Could not submit. Not all fields are valid.";
      } else {
        // Assign the field's data to its name.
        data[field.props.label] = field.getValue();
      }
    }
    this.props.appendData(data);
  }

  render() {
    return (
      <div className="background">
        <div className={"logo-container"}>
          <CDLogo className="logo" />
        </div>
        <div className="tile">
          <h1 className="primary-header">Welcome!</h1>
          <PrimaryButton label="Sign up" onClick={this.primaryButtonClicked} />
          <PrimaryButton label="Log in" onClick={this.primaryButtonClicked} />
          <div className="spacer" />
        </div>
      </div>
    );
  }
}

export default HomePage;
