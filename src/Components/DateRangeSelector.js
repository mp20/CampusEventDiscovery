import { Component } from "react";
import valid from "./images/valid.svg";
import invalid from "./images/invalid.svg";

class DateRangeSelector extends Component {
    constructor(props) {
        super(props);

        if (props.hasOwnProperty("fields") && props.hasOwnProperty("label")) {
            //Add the FormElements to the delegate's fields.
            this.props.fields[props.label] = this;
        } else {
            throw "FormElement: Must pass `delegate: FormDelegate` and `label: String` as prop.";
        }

        this.state = {
            isVisible: !props.isSecure,
            focus: false
        };

        this.start = "";
        this.end = "";
        if (this.props.initialState) {
            this.start = this.props.initialState[0];
            this.end = this.props.initialState[1];
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        if (event.target.id === "start") {
            this.start = event.target.value;
        } else {
            this.end = event.target.value;
        }

        this.setState({ ok: true });
    }

    isValid() {
        if (!(new Date(this.start) < new Date(this.end))) {
            throw "Must be valid date and duration."
        } else {
            return true;
        };
    }

    getValue() {
        return [this.start, this.end];
    }

    render() {
        return (
            <div>
                <div className="field-header-container">
                    <p className="field-header">{this.props.label}</p>
                    {this.props.readOnly ? <></> : <img src={(new Date(this.start) < new Date(this.end)) ? valid : invalid} />}
                </div>

                <div className="datetime-range-container">
                    <div
                        className={
                            this.state.focus ? "field-container-white-selected" : "field-container-white"
                        }
                    >
                        <input
                            type="datetime-local"
                            className="field"
                            id="start"
                            onChange={this.onChange}
                            value={this.start}
                            readOnly={this.props.readOnly}
                        />
                    </div>
                    <div>
                        <p className="field-header">to</p>
                    </div>
                    <div
                        className={
                            this.state.focus ? "field-container-white-selected" : "field-container-white"
                        }
                    >
                        <input
                            type="datetime-local"
                            className="field"
                            id="end"
                            onChange={this.onChange}
                            value={this.end}
                            readOnly={this.props.readOnly}
                        />
                    </div>
                </div>

            </div>
        );
    }
}

export default DateRangeSelector;
