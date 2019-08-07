import React from 'react'
import { hours12 } from "../../../../util/helper_functions"
import { Link } from 'react-router-dom'

export default class EventsShowPage extends React.Component {


    constructor(props) {
        super(props)
        this.state = { upcomingPastToggleIndex: 0 }
        this.setUpcomingPastToggleIndex = this.setUpcomingPastToggleIndex.bind(this)
    }

    setUpcomingPastToggleIndex(idx) {
        return (e) => {
            this.setState({ upcomingPastToggleIndex: idx })
        }
    }

    render () {
        const upcomingSelected = this.state.upcomingPastToggleIndex === 0

        const today = new Date()

        const eventLis = this.props.events.map(event => {

            const pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
            const dt = new Date(event.start_day.replace(pattern, '$3-$2-$1'));

            if (upcomingSelected && today > dt) {
                return null
            } else if (!upcomingSelected && today < dt) {
                return null
            }

            const splitTime = event.start_time.split(":")
            const dateTime = (hours12(parseInt(splitTime[0]))) + ":" + (splitTime[1]) + (parseInt(splitTime[0]) > 11 ? " PM" : " AM")
            const dateString = dt.toDateString().slice(0, -5) + ", " + dateTime

            

            return (
                <Link to={`/events/${event.id}`} key={`group-show-events-${event.id}`}>
                    <li className="card-event">
                        <ul className="card-content">
                            <div className="top-card">
                                <span className="time">{dateString}</span>
                                <span className="name">{event.name}</span>
                                <div className="description-container">
                                    <span className="description">{event.description}</span>
                                </div>
                                <span className="location"><i className="fas fa-map-marker-alt"></i>{event.address}</span>
                            </div>
                            <div className="bottom-card">
                                <span className="attendees">{event.user_ids.length} attendees</span>
                                <button className="attend-button">Attend</button>
                            </div>
                        </ul>
                    </li>
                </Link>
            )
        })

        const createEventBar = (this.props.owner.id === this.props.currentUserId) ? (
            <div className="create-event-bar">
                <div className="left-side">
                    <Link className="create-event-btn" to={`/groups/${this.props.group.id}/new/event`}>Create New Event</Link> 
                </div>
                <div className="right-side"></div>
            </div>
        ) : null

        return (
            <div className="event-content-container">
                <div className="events-nav-bar">
                    {createEventBar}
                </div>
                <div className="event-content">
                    <div className="left-side">
                        <ul className="upcoming-past-toggle">
                            <li onClick={this.setUpcomingPastToggleIndex(0)} className={`toggle ${upcomingSelected ? "selected" : ""}`} key="toggle-upcoming">Upcoming</li>
                            <li onClick={this.setUpcomingPastToggleIndex(1)} className={`toggle ${!upcomingSelected ? "selected" : ""}`} key="toggle-past">Past</li>
                        </ul>
                    </div>
                    <div className="right-side">
                        <ul className="events-list">
                            {eventLis}
                        </ul>
                    </div>
                </div>
            </div>
        )

    }

}