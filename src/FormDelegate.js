import { Component } from "react";

class FormDelegate extends Component {
  constructor(props) {
    super(props);

    this.fields = {};

    this.submitData = this.submitData.bind(this);
  }

  /**
  * Submits the data to the delegate (the application).
  */
  submitData() {
    let data = {};
    for (const [entry, field] of Object.entries(this.fields)) {
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
}

export default FormDelegate;
