import { Component } from "react";
import DateRangeSelector from "./Components/DateRangeSelector";
import ImageWell from "./Components/ImageWell";
import TextBox from "./Components/TextBox";
import leftArrow from "./images/left-arrow.svg";
import valid from "./Components/images/valid.svg";

class EventPage extends Component {

    constructor(props) {
        super(props);

        let attending = 0;
        if (this.props.event.attendees.includes(this.props.currentUser)) {
            attending = 2;
        } else if (this.props.event.maybe.includes(this.props.currentUser)) {
            attending = 1;
        }

        this.state = {
            event: this.props.event,
            attending: attending,
            deleteClickedOnce: false
        }

        this.attend = this.attend.bind(this);
        this.maybeAttend = this.maybeAttend.bind(this);
        this.generateBottomButtons = this.generateBottomButtons.bind(this);
        this.isInvited(this.props.event.eventID, this.props.currentUser);
    }

    attend() {
        if (this.state.attending == 2) {
            this.removeAttendee(this.props.currentUser);
            this.setState({ attending: 0 });
            return;
        } else if (this.state.attending == 1) {
            this.removeMaybeAttendee(this.props.currentUser);
        }

        fetch(`http://localhost:8080/api/add-attendees/attending/${this.props.event.eventID}/${this.props.currentUser}`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
        });
        this.setState({ attending: 2 });
    }

    maybeAttend() {
        if (this.state.attending == 1) {
            this.removeMaybeAttendee(this.props.currentUser);
            this.setState({ attending: 0 });
            return;
        } else if (this.state.attending == 2) {
            this.removeAttendee(this.props.currentUser);
        }
        fetch(`http://localhost:8080/api/add-attendees/maybe/${this.props.event.eventID}/${this.props.currentUser}`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
        });
        this.setState({ attending: 1 });
    }

    removeMaybeAttendee(userID) {
        fetch(`http://localhost:8080/api/remove-attendees/maybe/${this.props.event.eventID}`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify([userID])
        });
    }

    removeAttendee(userID) {
        fetch(`http://localhost:8080/api/remove-attendees/attendees/${this.props.event.eventID}`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify([userID])
        });
    }

    render() {
        return (
            <div className="event-browser-container">
                <div className="top-buttons">
                    <div className="top-button" onClick={this.props.returnToBrowser}>
                        <img src={leftArrow} />
                    </div>
                </div>
                <div className="event-container">
                    <ImageWell
                        label="Image"
                    />
                    <p className="header-centered">
                        {this.props.event.name}
                    </p>
                    <div className="ahhh-div">
                        <p className="paragraph-centered">
                            Organizer:
                        </p>
                        <p className="paragraph-centered-bold">
                            {this.props.event.ownerName}
                        </p>
                    </div>
                    <div className="ahhh-div">
                        <p className="paragraph-centered">
                            Tags:
                        </p>
                        <p className="paragraph-centered-bold">
                            {this.props.event.categories.join(', ')}
                        </p>
                    </div>
                    <TextBox
                        label="Description"
                        isSecure={false}
                        fields={[]}
                        initialState={this.state.event.description}
                        readOnly={true}
                    />
                    <DateRangeSelector
                        label="Date and Time"
                        check="NotEmpty"
                        isSecure={false}
                        fields={[]}
                        initialState={this.state.event.date}
                        readOnly={true}
                    />
                </div>
                {this.generateBottomButtons()}
            </div>
        );
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
        }).then(response => response.json()).then(response => {

            this.setState({ isInvited: response });
        });
    }

    generateBottomButtons() {
        if (this.props.event.isInviteOnly) {

            if (this.state.isInvited) {

                return (<div className="bottom-butt-contain">
                    <div className="primary-bottom-button" onClick={this.attend}>
                        {this.state.attending == 2 ? <img
                            src={valid}
                        /> : <div className="spacer" />}
                        <p className="bott-butt-text">Accept Invite</p>
                    </div>
                </div>);
            } else {
                return (<></>);
            }
        } else {
            return (
                <div className="bottom-butt-contain">
                    <div className="primary-bottom-button" onClick={this.attend}>
                        {this.state.attending == 2 ? <img
                            src={valid}
                        /> : <div className="spacer" />}
                        <p className="bott-butt-text">Attend</p>
                    </div>
                    <div className="spacer" />
                    <div className="secondary-bottom-button" onClick={this.maybeAttend}>
                        {this.state.attending == 1 ? <img
                            src={valid}
                        /> : <div className="spacer" />}
                        <p className="bott-butt-text">Maybe Attend</p>
                    </div>
                </div>
            );
        }
    }

}

export default EventPage;