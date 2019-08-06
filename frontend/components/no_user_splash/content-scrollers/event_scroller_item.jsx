import React from 'react'
import { hours12 } from '../../../util/helper_functions';

export const EventScrollerItem = ({event}) => {
    const pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
    const dt = new Date(event.start_day.replace(pattern, '$3-$2-$1'));

    const splitTime = event.start_time.split(":")
    const dateTime = (hours12(parseInt(splitTime[0]))) + ":" + (splitTime[1]) + (parseInt(splitTime[0]) > 11 ? " PM" : " AM")
    const dateString = dt.toDateString().slice(0, -5) + ", " + dateTime

    return (
        <li className="card-event">
            <ul className="card-content">
                <div className="top-card">
                    <span className="time">{dateString}</span>
                    <span className="name">{event.name}</span>
                    <span className="description">{event.description}</span>
                    <span className="location"><i className="fas fa-map-marker-alt"></i>{event.location}</span>
                </div>
                <div className="bottom-card">
                    <span className="attendees">{event.attendees} attendees</span>
                    <button className="attend-button">Attend</button>
                </div>
            </ul>
        </li>
    )
}