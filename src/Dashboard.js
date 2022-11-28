import "./Stylesheets/AppScreen.css";
import menuIcon from "./images/Hamburger.svg";
import logo from "./images/Logo-Centered.svg";
import EventBrowser from "./EventBrowser";
import { Component } from "react";
import EventTile from "./EventTile";
import EventEditor from "./EventEditor";
import AttendeesPopup from "./AttendeesPopup";
import EventPage from "./EventPage";
import InvitesPopup from "./InvitesPopup";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import EventBrowserMapView from "./EventBrowserMapView";
import EventEditorMapView from "./EventEditorMapView";
import MyEventsPopup from "./MyEventsPopup";
import HamburgerDropdown from "./HamburgerDropdown";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.categoryOptions = [];
        this.setup = this.setup.bind(this);
        this.state = {
            abc: false,
            page: "EventBrowser",
            selectedEvent: null,
            showAttendeesPopup: false,
            showMyEventsPopup: false,
            showHamburgerMenu: false,
            savedLocation: [33.7756, -84.3963]
        };
        this.setup();

        this.generateLeftPage = this.generateLeftPage.bind(this);
        this.segueToEventPage = this.segueToEventPage.bind(this);
        this.toEventBrowser = this.toEventBrowser.bind(this);
        this.showAttendeesPopup = this.showAttendeesPopup.bind(this);
        this.setLocationData = this.setLocationData.bind(this);
        this.getLocationData = this.getLocationData.bind(this);
        this.hamburgerClicked = this.hamburgerClicked.bind(this);
    }

    showAttendeesPopup(event) {
        if (event.isInviteOnly) {
            this.setState({
                selectedEvent: event,
                showInvitePopup: true
            });
        } else {
            this.setState({
                selectedEvent: event,
                showAttendeesPopup: true
            });
        }
    }

    toEventBrowser() {
        this.setState({
            page: "EventBrowser"
        });
    }

    setup() {
        fetch("http://localhost:8080/api/get-interests", {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((response) => {
                for (let k of response) {
                    this.categoryOptions.push(k);
                }
            })
            .then(() => {
                this.setState({ abc: true });
            });
    }

    colors = {
        Student: "skyblue",
        Teacher: "red",
        Organizer: "limegreen",
        Admin: "purple",
    };

    eventBlocks(n) {
        let content = [];
        for (let i = 0; i < n; i++) {
            content.push(<EventTile key={i} id={i} />);
        }
        return content;
    }

    segueToEventPage(event) {
        // Determine if the user is able to edit the event:
        if (event) {
            if (event.owner == this.props.userID || this.props.userType == 3) {
                this.setState({
                    page: "EventEditor",
                    selectedEvent: event
                });
            } else {
                this.setState({
                    page: "EventViewer",
                    selectedEvent: event
                });
            }
        } else {
            this.setState({
                page: "EventEditor",
                selectedEvent: {
                    attendees: [],
                    capacity: "",
                    categories: [],
                    date: "",
                    description: "",
                    eventID: -1,
                    location: "",
                    name: "",
                    owner: -1,
                }
            });
        }
    }

    generateLeftPage() {
        if (this.state.page == "EventViewer") {
            return (
                <EventPage
                    event={this.state.selectedEvent}
                    currentUser={this.props.userID}
                    returnToBrowser={this.toEventBrowser}
                />
            );
        } else if (this.state.page == "EventEditor") {
            return (
                <EventEditor
                    getLocationData={this.getLocationData}
                    categories={this.categoryOptions}
                    currentUser={this.props.userID}
                    userType={this.props.userType}
                    event={this.state.selectedEvent}
                    returnToBrowser={this.toEventBrowser}
                    showAttendeesPopup={this.showAttendeesPopup}
                />
            );
        } else {
            return (
                <EventBrowser
                    categories={this.categoryOptions}
                    currentUser={this.props.userID}
                    userType={this.props.userType}
                    events={this.props.events}
                    changePage={this.segueToEventPage}
                />
            );
        }
    }

    generateProfileIcon(userType) {
        return (
            <svg
                width="36px"
                height="36px"
                className="profile-icon"
                viewBox="0 0 36 36"
                version="1.1"
            >
                <title>{userType}</title>
                <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                >
                    <g id="Dashboard" transform="translate(-1390, -14)">
                        <g id="Group-3" transform="translate(1390, 14)">
                            <circle id="Oval" fill="#FFFFFF" cx="18" cy="18" r="18"></circle>
                            <circle
                                id="Oval-Copy-3"
                                fill={this.colors[userType]}
                                cx="17.9795003"
                                cy="10.5540287"
                                r="5.76"
                            ></circle>
                            <path
                                d="M17.9817741,31.2059713 C21.8990946,31.2059713 25.4054987,29.446629 27.7539367,26.6749941 C36.9322998,15.8426575 -0.843746097,15.9901893 8.20961156,26.6749941 C10.5580496,29.446629 14.0644536,31.2059713 17.9817741,31.2059713 Z"
                                id="Oval-Copy-6"
                                fill={this.colors[userType]}
                            ></path>
                        </g>
                    </g>
                </g>
            </svg>
        );
    }

    getLocationData() {
        return this.state.savedLocation;
    }

    setLocationData(location) {
        this.setState({ savedLocation: location });
    }

    hamburgerClicked() {
        this.setState({ showHamburgerMenu: true })
    }

    render() {
        return (
            <div className="AppScreen">
                <div className={"AppScreen-header-" + this.props.userType}>
                    <div className="header-menu">
                        <img src={menuIcon} alt="Menu" onClick={this.hamburgerClicked} className="hamburger-menu" />
                    </div>
                    <img src={logo} alt="Menu" className="centered-logo" />
                    <div className="header-profile">
                        <div className="header-profile-text">
                            <div className="header-profile-name">{this.props.name}</div>
                            <div className="header-profile-type">{this.props.userType}</div>
                        </div>
                        {this.generateProfileIcon(this.props.userType)}
                    </div>
                </div>
                <div className="AppScreen-body">
                    {this.generateLeftPage()}
                    {(this.state.page == "EventEditor") ? <EventEditorMapView
                        event={this.state.selectedEvent}
                        setLocationData={this.setLocationData}
                    /> : (
                        (this.state.page == "EventViewer") ?
                            <EventBrowserMapView event={this.state.selectedEvent} /> :
                            <EventBrowserMapView changePage={this.segueToEventPage} />
                    )}
                </div>
                {this.state.showAttendeesPopup ? <AttendeesPopup
                    hide={() => this.setState({ showAttendeesPopup: false })}
                    event={this.state.selectedEvent}
                /> : <></>}
                {this.state.showInvitePopup ? <InvitesPopup
                    hide={() => this.setState({ showInvitePopup: false })}
                    event={this.state.selectedEvent}
                    currentUser={this.props.userID}
                /> : <></>}
                {this.state.showHamburgerMenu ? <HamburgerDropdown
                    hide={() => this.setState({ showHamburgerMenu: false })}
                    showMyEvents={() => this.setState({
                        showHamburgerMenu: false,
                        showMyEventsPopup: true
                    })}
                    logout={this.props.logout}
                    currentUser={this.props.userID}
                /> : <></>}
                {this.state.showMyEventsPopup ? <MyEventsPopup
                    hide={() => this.setState({ showMyEventsPopup: false })}
                    currentUser={this.props.userID}
                    showEvent={(event) => {
                        this.setState({ showMyEventsPopup: false });
                        this.segueToEventPage(event);
                    }}
                /> : <></>}
            </div>
        );
    }
}

export default Dashboard;
