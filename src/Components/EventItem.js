import { Component } from "react";

class EventItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            event: this.props.selectedEvent,
            invitedAlready: this.props.hideButton
        }
    }


    render() {
        return (
            <div className={(this.props.index % 2 == 0) ? "attendee-item-container-odd" : "attendee-item-container-even"}>
                <p className="attendee-text-point" onClick={() => this.props.showEvent(this.props.event)}>{this.props.name}</p>
            </div>
        );
    }

}

export default EventItem;