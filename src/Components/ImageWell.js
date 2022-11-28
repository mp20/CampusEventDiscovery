import { Component } from "react";
import placeholder from "./images/Placeholder.svg";

class ImageWell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: !props.isSecure,
            focus: false
        };

        this.onDrop = this.onDrop.bind(this);
        this.onDrag = this.onDrag.bind(this);
    }

    onChange(event) { }

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

    onDrag(event) {
        this.setState({
            focus: true
        })
    }

    onDrop(event) {

    }

    render() {
        return (
            <form id="form-file-upload" onDragEnter={this.onDrag} onSubmit={(e) => e.preventDefault()}>
                <input type="file" id="input-file-upload" multiple={true} />
                <div id="label-file-upload" htmlFor="input-file-upload" onDrop={this.onDrop} onDragOver={this.onDrag} className={this.state.focus ? "image-well-dragover" : "image-well"}>
                    <img src={placeholder} className="placeholder-image" />
                </div>
            </form >
        );
    }
}

export default ImageWell;
