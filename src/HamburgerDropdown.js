import { Component } from "react";
import AttendeeItem from "./Components/AttendeeItem";
import "./Stylesheets/index.css";
import "./Stylesheets/Popup.css";

class HamburgerDropdown extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="popup-container" onClick={this.props.hide}>
                <div className="hamburger-dropdown">
                    <p onClick={this.props.showMyEvents} className="hamburger-dropdown-text">My Events</p>
                    <p onClick={this.props.logout} className="hamburger-dropdown-text">Log Out</p>
                </div>
            </div>
        );
    }
}

export default HamburgerDropdown;