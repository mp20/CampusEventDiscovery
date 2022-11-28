import { Component } from "react";
import AttendeeItem from "./Components/AttendeeItem";
import "./Stylesheets/index.css";
import "./Stylesheets/Popup.css";

class InvitesPopup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            leftPopulation: [],
            rightPopulation: []
        }

        this.getAttending = this.getAttending.bind(this);
        this.generateAttendingUserRows = this.generateAttendingUserRows.bind(this);
        this.generateInviteUserRows = this.generateInviteUserRows.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.removeAttendingUser = this.removeAttendingUser.bind(this);
        this.inviteUser = this.inviteUser.bind(this);

        this.getAttending();
        this.getAllUsers();
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

    getAllUsers() {
        fetch(`http://localhost:8080/api/get-all-users/`, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => response.json()).then(response => {
            let filtered = response.users.filter(user => {
                return user[0] != this.props.currentUser
            })
            this.setState({ rightPopulation: filtered })
        });
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

    generateInviteUserRows() {
        let rows = [];
        for (let i = 0; i < this.state.rightPopulation.length; i++) {
            let item = this.state.rightPopulation[i];
            rows.push(<AttendeeItem
                userID={item[0]}
                eventID={this.props.event.eventID}
                key={i}
                index={i}
                name={item[1]}
                addIcon={true}
                remove={this.inviteUser}
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

    inviteUser(userID, completionHandler) {
        fetch(`http://localhost:8080/api/invite/${this.props.event.eventID}`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify([userID])
        }).then(() => { this.getAllUsers(); completionHandler(); });
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
                                Invite Users
                            </p>
                            <div className="attendees-well">
                                {this.generateInviteUserRows()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InvitesPopup;