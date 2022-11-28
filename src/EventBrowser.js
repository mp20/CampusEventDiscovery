import "./Stylesheets/index.css";
import EventTile from "./EventTile";
import placeholderImage from "./images/placeholderImage.png";
import Dropdown from "./Components/Dropdown";
import FormDelegate from "./FormDelegate";
import PageSelect from "./Components/PageSelect";

class EventBrowser extends FormDelegate {
    constructor(props) {
        super(props);

        this.blankEvent = {
            attendees: [],
            capacity: "",
            categories: [],
            date: "",
            description: "",
            eventID: -1,
            location: [33.7756, -84.3963],
            name: "",
            owner: -1,
        };

        this.state = {
            menuType: "browser",
            popUpInfo: {
                thumbnail: placeholderImage,
                event: this.blankEvent,
            },
            currentPage: 1,
            events: [],

        };

        this.tiles = this.tiles.bind(this);
        this.getEvents = this.getEvents.bind(this);
        this.filterDidChange = this.filterDidChange.bind(this);
        this.setPage = this.setPage.bind(this);
        this.categoryOptions = this.props.categories;
        this.getEvents();
    }

    setPage(value) {
        this.setState({
            currentPage: value
        })
    }

    render() {
        return (
            <div className="event-browser-container">

                <h1 className="primary-header">Campus Events Near Me</h1>

                <div className="event-tile-browser-container">{this.tiles()}</div>

                <div className="event-browser-bottom-buttons">

                    <Dropdown
                        label="Filter"
                        isSecure={false}
                        showLabel={false}
                        onChange={this.filterDidChange}
                        options={["No Filter"].concat(this.categoryOptions)}
                        fields={this.fields}
                    />

                    <PageSelect
                        key={Date.now()}
                        numberOfPages={Math.ceil(this.state.events.length / 10)}
                        changePage={this.setPage}
                        currentPage={this.state.currentPage}
                    />
                    <button
                        className="new-event-button"
                        onClick={() => this.props.changePage(null)}
                    >
                        New Event
                    </button>

                </div>

            </div>
        );
    }

    getEvents() {
        fetch("http://localhost:8080/api/get-events", {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) =>
                response.json()
            )
            .then((response) => {
                this.setState({ events: response.events, currentPage: 1 });
            });
    }



    tiles() {
        let tiles = [];
        for (let i = (this.state.currentPage - 1) * 10; i < Math.min((this.state.currentPage - 1) * 10 + 10, this.state.events?.length); i++) {
            tiles.push(
                <EventTile
                    key={i}
                    event={this.state.events[i]}
                    onClick={this.props.changePage}
                />
            );
        }
        return tiles;
    }

    filterDidChange(value) {
        console.log(this.categoryOptions.indexOf(value))
        if (value == "No Filter") {
            this.getEvents();
        } else {
            fetch(
                "http://localhost:8080/api/get-events-filtered",
                {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(this.categoryOptions.indexOf(value))
                }
            )
                .then((response) => response.json())
                .then((response) => {
                    this.setState({ events: response.events[0], currentPage: 1 });
                });
        }
    }
}

export default EventBrowser;
