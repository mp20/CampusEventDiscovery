import { Component } from "react";
import AttendeeItem from "./Components/AttendeeItem";
import "./Stylesheets/index.css";
import "./Stylesheets/Popup.css";

class AttendeesPopup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            leftPopulation: [],
            rightPopulation: []
        }

        this.getAttending = this.getAttending.bind(this)
        this.generateAttendingUserRows = this.generateAttendingUserRows.bind(this);
        this.generateMaybeAttendingUserRows = this.generateMaybeAttendingUserRows.bind(this);
        this.getMaybeAttending = this.getMaybeAttending.bind(this);
        this.removeAttendingUser = this.removeAttendingUser.bind(this);
        this.removeMaybeAttendingUser = this.removeMaybeAttendingUser.bind(this);

        this.getAttending();
        this.getMaybeAttending();
    }

    getAttending() {

        // get attendees
        fetch(`http://localhost:8080/api/get-attendees/attendees/${this.props.event.eventID}`, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => response.json()).then(response => {
            this.setState({ leftPopulation: response.attendees })
        });
    }

    getMaybeAttending() {
        fetch(`http://localhost:8080/api/get-attendees/maybe/${this.props.event.eventID}`, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => response.json()).then(response => this.setState({ rightPopulation: response.attendees }));
    }

    generateAttendingUserRows() {
        let rows = [];
        for (let i = 0; i < this.state.leftPopulation.length; i++) {
            let item = this.state.leftPopulation[i];
            rows.push(<AttendeeItem
                userID={item[0]}
                key={i}
                index={i}
                name={item[1]}
                remove={this.removeAttendingUser}
            />);
        }
        return rows;
    }

    generateMaybeAttendingUserRows() {
        let rows = [];
        for (let i = 0; i < this.state.rightPopulation.length; i++) {
            let item = this.state.rightPopulation[i];
            rows.push(<AttendeeItem
                userID={item[0]}
                key={i}
                index={i}
                name={item[1]}
                remove={this.removeAttendingUser}
            />);
        }
        return rows;
    }

    removeAttendingUser(userID) {

        fetch(`http://localhost:8080/api/remove-attendees/attendees/${this.props.event.eventID}`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify([userID])
        }).then(() => { this.getAttending() });
    }

    removeMaybeAttendingUser(userID) {
        fetch(`http://localhost:8080/api/remove-attendees/maybe/${this.props.event.eventID}`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify([userID])
        }).then(response => response.json()).then(response => { if (response.success) { this.getMaybeAttending() } });
    }

    render() {
        return (
            <div className="popup-container">
                <div className="popup" onClick={this.props.hide} />
                <div className="attendees-tile">
                    <div className="attendees-wrapper">
                        <div className="attendees-container">
                            <p className="primary-header">
                                Attending
                            </p>
                            <div className="attendees-well">
                                {this.generateAttendingUserRows()}
                            </div>
                        </div>
                        <div className="attendees-container">
                            <p className="primary-header">
                                Maybe Attending
                            </p>
                            <div className="attendees-well">
                                {this.generateMaybeAttendingUserRows()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AttendeesPopup;