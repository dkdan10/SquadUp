import React from 'react'
import { hours12 } from '../../../util/helper_functions';

export default class EventShowContent extends React.Component {

    componentDidMount () {
        const eventLat = this.props.event.lat;
        const evntLng = this.props.event.lng
        const mapOptions = {
            center: { lat: eventLat, lng: evntLng },
            zoom: 15,
            draggable: false, 
            zoomControl: false, 
            scrollwheel: false, 
            disableDoubleClickZoom: true,
            disableDefaultUI: true
        };
        this.map = new google.maps.Map(this.mapNode, mapOptions);
        const myLatlng = new google.maps.LatLng(eventLat, evntLng);

        var marker = new google.maps.Marker({
            position: myLatlng,
            title: "Hello World!"
        });
        marker.setMap(this.map);
    }

    render() {
        const { event, group, organizer } = this.props

        const pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
        const dt = new Date(event.start_day.replace(pattern, '$3-$2-$1'));

        const splitTime = event.start_time.split(":")
        const dateTime = (hours12(parseInt(splitTime[0]))) + ":" + (splitTime[1]) + (parseInt(splitTime[0]) > 11 ? " PM" : " AM")


        return (
            <div className="event-show-body-container">
                <div className="left-side-content">
                    <div className="block-spacing"></div>
                    <div className="main-content">
                        <h1>Details</h1>
                        <p>{event.description}</p>
                        <h1 className="attendees-header">Attendees (2)</h1>
                        <div className="attendees">
                            
                        </div>
                    </div>
                </div>
                <div className="right-side-bar">
                    <div className="location-time-info-container">
                        <div className="time-info">
                            <i className="far fa-clock"></i>
                            <div className="text">
                                <p>{dt.toDateString()}</p>
                                <p className="time">{dateTime}</p>
                            </div>
                        </div>
                        <div className="location-info">
                            <i className="fas fa-map-marker-alt"></i>
                            <div className="text">
                                <p>{event.address}</p>
                            </div>
                        </div>
                        <div ref={map => this.mapNode = map} className="map"></div>
                    </div>
                </div>
            </div>
        )
    }

}