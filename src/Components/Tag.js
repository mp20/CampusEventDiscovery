import { Component } from "react";
import tagPlus from "./images/plus.svg";
import tagDelete from "./images/invalidWhite.svg";

class Tag extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: this.props.selected
        };

        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        this.setState({
            selected: !this.state.selected
        });
        this.props.toggleSelection(this.props.name);
    }

    render() {
        return (
            <div onClick={this.onClick} className={this.state.selected ? "tag-container-selected" : "tag-container"}>
                {this.state.selected ? <img className="tag-image" src={tagDelete} /> : <img className="tag-image" src={tagPlus} />}
                {this.state.selected
                    ? <p className="tag-text-selected">{this.props.name}</p>
                    : <p className="tag-text">{this.props.name}</p>}
            </div>
        );
    }
}

export default Tag;