import React from 'react'
import { hours12 } from '../../../util/helper_functions';

export const EventScrollerItem = ({event}) => {
    const dateTime = (hours12(event.startTime)) + ":" + (event.startTime.getMinutes() < 10 ? "0" : "") + (event.startTime.getMinutes()) + (event.startTime.getHours() > 11 ? " PM" : " AM")
    const dateString = event.startTime.toDateString().slice(0, -5) + ", " + dateTime

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