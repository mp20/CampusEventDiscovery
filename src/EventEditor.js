import TextField from "./Components/TextField";
import TextBox from "./Components/TextBox";
import FormDelegate from "./FormDelegate";
import DateRangeSelector from "./Components/DateRangeSelector";
import TagSelector from "./Components/TagSelector";
import RadioButton from "./Components/RadioButton";
import ImageWell from "./Components/ImageWell";
import leftArrow from "./images/left-arrow.svg";
import attendees from "./images/attendees.svg";

class EventEditor extends FormDelegate {

    constructor(props) {
        super(props);

        this.state = {
            event: this.props.event,
            deleteClickedOnce: false
        }
        this.saveEvent = this.saveEvent.bind(this);
        this.getEventData = this.getEventData.bind(this);
        this.delete = this.delete.bind(this);
    }

    delete() {
        if (this.state.deleteClickedOnce) {
            fetch(
                `http://localhost:8080/api/delete-event/${this.state.event.eventID}`,
                {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then(() => this.props.returnToBrowser());
        } else {
            this.setState({ deleteClickedOnce: true });
        }
    }

    getEventData() {

        const nameMap = {
            "Title": "name",
            "Capacity": "capacity",
            "Date and Time": "date",
            "Description": "description",
            "Tags": "categories",
            "Invite Only": "isInviteOnly"
        };
        let data = this.state.event;
        for (const [entry, field] of Object.entries(this.fields)) {

            if (typeof field.isValid() === "string" || !field.isValid) {
                throw "Could not submit. Not all fields are valid.";
            } else {
                data[nameMap[field.props.label]] = field.getValue();
            }
        }
        if (data["owner"] == -1) {
            data["owner"] = this.props.currentUser;
        }
        data["location"] = this.props.getLocationData();
        this.state.event = data;
        return data;
    }

    render() {
        return (
            <div className="event-browser-container">
                <div className="top-buttons">
                    <div className="top-button" onClick={this.props.returnToBrowser}>
                        <img src={leftArrow} />
                    </div>
                    {this.props.event.eventID != -1 ? <div className="top-button" onClick={(e) => { this.props.showAttendeesPopup(this.props.event) }}>
                        <img src={attendees} />
                        <p className="butt-text">Attendees</p>
                    </div> : <></>}
                </div>
                <div className="event-container">
                    <div>
                        <ImageWell
                            label="Image"
                        />
                        <TextField
                            label="Title"
                            check="NotEmpty"
                            isSecure={false}
                            fields={this.fields}
                            color="white"
                            initialState={this.state.event.name}
                        />
                        <TextBox
                            label="Description"
                            check="NotEmpty"
                            isSecure={false}
                            fields={this.fields}
                            initialState={this.state.event.description}
                        />
                        <DateRangeSelector
                            label="Date and Time"
                            check="NotEmpty"
                            isSecure={false}
                            fields={this.fields}
                            initialState={this.state.event.date}
                        />
                        <TextField
                            label="Capacity"
                            check="Numeric"
                            isSecure={false}
                            fields={this.fields}
                            color="white"
                            initialState={this.state.event.capacity}
                        />
                        {
                            this.props.event.eventID == -1
                                ? <RadioButton
                                    label="Invite Only"
                                    fields={this.fields}
                                    color="white"
                                    isChecked={this.state.event.isInviteOnly}
                                />
                                : <></>
                        }
                        <TagSelector
                            label="Tags"
                            isSecure={false}
                            fields={this.fields}
                            categories={this.props.categories}
                            initialState={this.state.event.categories}
                        />
                    </div>
                </div>
                <div className="event-browser-bottom-buttons">

                    {
                        this.props.event.eventID == -1
                            ? <></>
                            : <button className="delete-event-button" onClick={this.delete}>
                                {this.state.deleteClickedOnce ? "Confirm Delete" : "Delete Event"}
                            </button>
                    }
                    <button className="new-event-button" onClick={this.saveEvent}>
                        {
                            this.props.event.eventID == -1
                                ? "Create Event"
                                : "Save Event"
                        }
                    </button>
                </div>
            </div >
        );
    }

    saveEvent() {
        try {
            let event = this.getEventData(); // throws
            if (this.state.event.eventID == -1) {
                fetch("http://localhost:8080/api/add-event", {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(event),
                }).then(() => this.props.returnToBrowser());
            } else {
                fetch(
                    `http://localhost:8080/api/edit-event/${this.state.event.eventID}`,
                    {
                        method: "POST",
                        mode: "cors",
                        cache: "no-cache",
                        credentials: "same-origin",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(event),
                    }
                ).then(() => this.props.returnToBrowser());
            }
        } catch (e) {
            // no error handling <3 If u want, add a warning dialogue message.
        }
    }
}

export default EventEditor;