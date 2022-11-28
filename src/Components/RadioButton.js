import { Component } from "react";
import checkfalse from "./images/checkbox-false.svg";
import checktrue from "./images/checkbox-true.svg";
import checkfalsewhite from "./images/checkbox-false-white.svg"

class RadioButton extends Component {
  constructor(props) {
    super(props);

    if (props.hasOwnProperty("fields") && props.hasOwnProperty("label")) {
      //Add the FormElements to the delegate's fields.
      this.props.fields[props.label] = this;
    } else {
      throw "FormElement: Must pass `delegate: FormDelegate` and `label: String` as prop.";
    }

    this.state = {
      isChecked: this.props.isChecked,
    };

    // Bind methods.
    this.onClick = this.onClick.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  isValid() {
    return true;
  }

  getValue() {
    return this.state.isChecked;
  }

  onClick() {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  }

  render() {

    return (
      <div>
        <button className="radio-container" onClick={this.onClick}>
          <img
            src={this.state.isChecked ? checktrue : (this.props.color === "white" ? checkfalsewhite : checkfalse)}
            className="checkbox"
          />
          <p className="paragraph">{this.props.label}</p>
        </button>
      </div>
    );
  }
}

export default RadioButton;
