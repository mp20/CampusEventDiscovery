import { Component } from "react";
import AttendeeItem from "./Components/AttendeeItem";
import EventItem from "./Components/EventItem";
import "./Stylesheets/index.css";
import "./Stylesheets/Popup.css";

class MyEventsPopup extends Component {

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

        this.getAttending();
        this.getMaybeAttending();
    }

    getAttending() {

        // get attendees
        fetch(`http://localhost:8080/api/get-user-attending`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.props.currentUser)
        }).then(response => response.json()).then(response => {

            this.setState({ leftPopulation: response.events })
        });
    }

    getMaybeAttending() {
        // get attendees
        fetch(`http://localhost:8080/api/get-user-maybe-attending`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.props.currentUser)
        }).then(response => response.json()).then(response => {
            this.setState({ rightPopulation: response.events })
        });
    }

    generateAttendingUserRows() {
        let rows = [];
        for (let i = 0; i < this.state.leftPopulation.length; i++) {
            let item = this.state.leftPopulation[i];
            rows.push(<EventItem
                key={i}
                index={i}
                name={item.name}
                event={item}
                showEvent={this.props.showEvent}
                hideButton={true}
            />);
        }
        return rows;
    }

    generateMaybeAttendingUserRows() {
        let rows = [];
        for (let i = 0; i < this.state.rightPopulation.length; i++) {
            let item = this.state.rightPopulation[i];
            rows.push(<AttendeeItem
                key={i}
                index={i}
                name={item.name}
                remove={() => { }}
            />);
        }
        return rows;
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

export default MyEventsPopup;