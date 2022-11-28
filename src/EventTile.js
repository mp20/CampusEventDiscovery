import { Component } from "react";
import placeholder from "./images/placeholderImage.png";

class EventTile extends Component {
  constructor(props) {
    super(props);



    this.state = {
      formVisible: false,
    };
  }

  render() {
    return (
      <div
        className="event-tile"
        id={this.props.event.eventID}
        onClick={() =>
          this.props.onClick(this.props.event)
        }
      >
        <img src={this.props.event.thumbnail ? placeholder : placeholder} alt="" className="event-thumbnail" />
        <h1 className="event-name">{this.props.event.name}</h1>
        <p className="owner-name">{this.props.event.ownerName}</p>
      </div>
    );
  }
}

export default EventTile;
