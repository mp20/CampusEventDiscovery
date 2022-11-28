import "./Stylesheets/AppScreen.css";
import { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMapEvent } from "react-leaflet";

function MapEventHandler(props) {
    const map = useMapEvent('click', (event) => props.onClick(map, event));
}

class EventEditorMapView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mapPinLoc: this.props.event.location ? this.props.event.location : [33.7756, -84.3963]
        };
        this.onMapClick = this.onMapClick.bind(this);
    }

    onMapClick(map, event) {
        map.flyTo([event.latlng.lat, event.latlng.lng], 17);
        this.props.setLocationData([event.latlng.lat, event.latlng.lng]);
        this.setState({
            mapPinLoc: [event.latlng.lat, event.latlng.lng]
        });
    }

    render() {
        return (
            <div className="event-map-container">
                <h1 className="primary-header">Choose a location for your event by clicking the map:</h1>
                <div className="event-container-map">
                    <MapContainer useMapEvent={this.mapEvent} center={this.state.mapPinLoc} zoom={15} scrollWheelZoom={false}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={this.state.mapPinLoc} />
                        <MapEventHandler
                            onClick={this.onMapClick}
                        />
                    </MapContainer>
                </div>
            </div>
        );
    }

}

export default EventEditorMapView;