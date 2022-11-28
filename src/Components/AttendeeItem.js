import { Component } from "react";
import deleteicon from "./images/invalid.svg";
import addicon from "./images/plus.svg";

class AttendeeItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            event: this.props.selectedEvent,
            invitedAlready: this.props.hideButton
        }

        this.isInvited(this.props.eventID, this.props.userID);
    }

    isInvited(eventID, userID) {
        fetch(`http://localhost:8080/api/is-invited/${userID}/${eventID}`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => response.json()).then(response => this.setState({ invitedAlready: response }));
    }

    render() {
        return (
            <div className={(this.props.index % 2 == 0) ? "attendee-item-container-odd" : "attendee-item-container-even"}>
                <p className="attendee-text">{this.props.name}</p>
                {!this.state.invitedAlready ? <img className="del-butt" src={this.props.addIcon ? addicon : deleteicon} onClick={() => {
                    this.props.remove(this.props.userID, () => { this.isInvited(this.props.eventID, this.props.userID) });
                }} /> : <></>}
            </div>
        );
    }

}

export default AttendeeItem;