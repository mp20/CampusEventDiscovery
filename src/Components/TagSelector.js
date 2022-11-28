import { Component } from "react";
import valid from "./images/valid.svg";
import invalid from "./images/invalid.svg";
import Tag from "./Tag";

class TagSelector extends Component {
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
            selections: this.props.initialState ? this.props.initialState : [],
            focus: false
        };

        this.generateTags = this.generateTags.bind(this);
        this.toggleSelection = this.toggleSelection.bind(this);
    }

    isValid() {

        if (!(this.state.selections.length >= 1 && this.state.selections.length <= 5)) {
            throw "Not enough/too many tags selected."
        } else {
            return true;
        }
    }

    getValue() {
        return this.state.selections;
    }

    onFocus() {
        this.setState({ focus: true });
    }

    onBlur() {
        this.setState({ focus: false });
    }

    arrayRemove(arr, value) {
        return arr.filter(function (ele) {
            return ele != value;
        });
    }

    toggleSelection(tagName) {
        if (this.state.selections.includes(tagName)) {
            this.setState({
                selections: this.arrayRemove(this.state.selections, tagName)
            });
        } else {
            this.setState({
                selections: this.state.selections.concat(tagName)
            });
        }
    }

    render() {
        return (
            <div>
                <div className="field-header-container">
                    <div className="field-header-container">
                        <p className="field-header">{this.props.label}</p>
                        <p className="field-header-light">(Choose 1-5)</p>
                    </div>
                    <img src={(this.state.selections.length >= 1 && this.state.selections.length <= 5) ? valid : invalid} />
                </div>
                {this.generateTags(this.props.categories)}
            </div>
        );
    }

    generateTags(tagList) {
        let tags = [];
        for (let i = 0; i < tagList.length; i++) {
            tags.push(<Tag
                name={tagList[i]}
                selected={this.state.selections.includes(tagList[i])}
                toggleSelection={this.toggleSelection}
                key={i}
            />)
        }
        return tags;
    }
}

export default TagSelector;
