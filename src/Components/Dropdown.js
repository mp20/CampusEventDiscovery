import { Component } from "react";
import dropdown from "./images/dropdown.svg";

class Dropdown extends Component {
  constructor(props) {
    super(props);

    if (props.hasOwnProperty("fields") && props.hasOwnProperty("label")) {
      //Add the FormElements to the delegate's fields.
      this.props.fields[props.label] = this;
    } else {
      throw "FormElement: Must pass `delegate: FormDelegate` and `label: String` as prop.";
    }

    this.state = {
      focus: false,
      selection: props.options[0],
    };

    if (this.props.hasOwnProperty("showLabel")) {
      this.showLabel = this.props.showLabel;
    } else {
      this.showLabel = true;
    }

    //Bind methods.
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  onChange(event) {
    this.setState({
      selection: event.target.value,
    });
    if (this.props.hasOwnProperty("onChange")) {
      this.props.onChange(event.target.value);
    }
  }

  isValid() {
    return true;
  }

  getValue() {
    return this.state.selection;
  }

  onFocus() {
    this.setState({ focus: true });
  }

  onBlur() {
    this.setState({ focus: false });
  }

  render() {
    return (
      <div>
        {this.showLabel ? (
          <div className="field-header-container">
            <p className="field-header">{this.props.label}</p>
          </div>
        ) : (
          <></>
        )}
        <div
          className={
            this.state.focus ? "field-container-selected" : "field-container"
          }
        >
          <select
            onChange={this.onChange}
            id=""
            type={this.state.isVisible ? "text" : "password"}
            className="dropdown"
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          >
            {this.props.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <img className="condition-indicator" src={dropdown} />
        </div>
      </div>
    );
  }
}

export default Dropdown;
