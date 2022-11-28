import React, { Component } from "react";

class PrimaryButton extends Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.props.onClick(this.props.label);
  }

  render() {
    return (
      <button className="primary-button" onClick={this.clickHandler}>
        {this.props.label}
      </button>
    );
  }
}

export default PrimaryButton;
