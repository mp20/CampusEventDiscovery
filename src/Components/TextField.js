import visible from "./images/visibility-true.svg";
import invisible from "./images/visibility-false.svg";
import valid from "./images/valid.svg";
import invalid from "./images/invalid.svg";
import { Component } from "react";

class TextField extends Component {
  rulesets = ["Numeric", "Username", "Email", "Password", "Confirm Password", "NotEmpty"];

  constructor(props) {
    super(props);

    if (props.hasOwnProperty("fields") && props.hasOwnProperty("label")) {
      //Add the FormElements to the delegate's fields.
      this.props.fields[props.label] = this;
    } else {
      throw "FormElement: Must pass `delegate: FormDelegate` and `label: String` as prop.";
    }

    let white = props.hasOwnProperty("color")

    if (this.rulesets.includes(props.check)) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }

    this.text = "";
    if (this.props.initialState) {
      this.text = this.props.initialState;
    }
    this.state = {
      isVisible: !props.isSecure,
      focus: false,
      color: white
    };

    //Bind methods.
    this.visibilityButtonPressed = this.visibilityButtonPressed.bind(this);
    this.isValid = this.isValid.bind(this);
    this.textDidChange = this.textDidChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.passwordRules = this.passwordRules.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  usernameRules(str) {
    if (!/^[A-Za-z0-9\-_]{5,20}$/.test(str)) {
      throw 'Username must be between 5 and 20 characters and can only contain letters, numbers, "-", and "_".';
    }
  }

  emailMatch(str) {
    if (!/^[A-Za-z0-9+_.\-]+@[A-Za-z0-9\-]+\.[A-Za-z]+$/.test(str)) {
      throw "Must be a valid email.";
    }
  }

  notEmpty(str) {
    if (str.length == 0 || str.search(/[^\s]/) == -1) {
      throw "Cannot be empty";
    }
  }

  passwordRules(str) {
    this.props.delegate.fields["Confirm Password"].setState({
      needsDisplay: true,
    });
    if (!/^[A-Za-z0-9\-_!?$#@%&]{5,20}$/.test(str)) {
      throw "Password must be between 5 and 20 characters and can only contain letters, numbers, and -_!?$#@%&.";
    }
    if (str.search(/[\-_!?$#@%&]/) == -1) {
      throw "Password must contain a symbol (-_!?$#@%&).";
    }
    if (str.search(/\d/) == -1) {
      throw "Password must contain a number.";
    }
    if (str.search(/[A-Z]/) == -1 && str.search(/[a-z]/) == -1) {
      throw "Password must use uppercase and lowercase letters.";
    }
  }

  repeatPasswordRules(str) {
    if (!this.props.checkPassword(str)) {
      throw "Passwords must match.";
    }
  }

  numeric(str) {
    if (!/^[123456789]\d*$/.test(str)) {
      throw "Must be a number.";
    }
  }

  visibilityButtonPressed() {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  }

  isValid() {
    // determine if the contents of the field are isValid.
    if (this.isChecked) {
      try {
        switch (this.props.check) {
          case "Username":
            this.usernameRules(this.text);
            break;
          case "Email":
            this.emailMatch(this.text);
            break;
          case "Password":
            this.passwordRules(this.text);
            break;
          case "Confirm Password":
            this.repeatPasswordRules(this.text);
            break;
          case "NotEmpty":
            this.notEmpty(this.text);
            break;
          case "Numeric":
            this.numeric(this.text);
            break;
          default:
            break;
        }
        return true;
      } catch (e) {
        return e;
      }
    } else {
      return true;
    }
  }

  getValue() {
    return this.text;
  }

  textDidChange(event) {
    if (this.isChecked && this.props.check == "Numeric") {
      if (/^([123456789]\d*)?$/.test(event.target.value)) {
        this.text = event.target.value;
        this.setState({});
      } else {
        this.setState({});
      }
    } else {
      this.text = event.target.value;
      this.setState({});
    }
  }

  onFocus(event) {
    this.setState({ focus: true });
  }

  onBlur(event) {
    this.setState({ focus: false });
  }

  render() {

    let style = this.state.color ? "field-container-white" : "field-container"

    let verify = this.isValid();
    const popover = () => {
      if (typeof verify === "string" && this.state.focus) {
        return <div className="popover">{verify}</div>;
      } else {
        return <></>;
      }
    };
    return (
      <div>
        <div className="field-header-container">
          <p className="field-header">{this.props.label}</p>
          {this.props.isSecure ? (
            <button
              className="visibility"
              onClick={this.visibilityButtonPressed}
            >
              <img src={this.state.isVisible ? visible : invisible} />
            </button>
          ) : (
            <></>
          )}
        </div>
        <div
          className={
            this.state.focus ? style + "-selected" : style
          }
        >
          <input
            type={this.state.isVisible ? "text" : "password"}
            className="field"
            onChange={this.textDidChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            value={this.text}
          />
          {this.isChecked ? (
            <img
              className="condition-indicator"
              src={typeof verify !== "string" ? valid : invalid}
            />
          ) : (
            <></>
          )}
          {popover()}
        </div>
      </div>
    );
  }
}

export default TextField;
