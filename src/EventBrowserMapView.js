import "./Stylesheets/AppScreen.css";
import { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

class EventBrowserMapView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
        this.generateMarkers = this.generateMarkers.bind(this);
        this.getEvents = this.getEvents.bind(this);

        this.getEvents();
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

                this.setState({ events: response.events });
            });
    }

    generateMarkers() {
        let markers = [];
        for (let i = 0; i < this.state.events.length; i++) {
            let event = this.state.events[i];

            markers.push(
                <Marker position={event.location}>
                    <Popup>
                        {event.name}
                        <div className="popup-edit-button" onClick={this.props.changePage.bind(this, event)}>Edit</div>
                    </Popup>
                </Marker>
            );
        }

        return markers
    }

    render() {
        return (
            <div className="map-container">
                <div className="map-frame">
                    <MapContainer center={[33.7756, -84.3963]} zoom={15} scrollWheelZoom={false}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {this.props.event ?
                            <Marker position={this.props.event.location}>
                                <Popup>
                                    {this.props.event.name}
                                </Popup>
                            </Marker>
                            : this.generateMarkers()}
                    </MapContainer>
                </div></div>
        );
    }

}

export default EventBrowserMapView;