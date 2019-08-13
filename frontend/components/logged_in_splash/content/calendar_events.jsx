import React from "react"
import { hours12 } from "../../../util/helper_functions";
import {Link} from "react-router-dom"

function sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


export default class CalendarContent extends React.Component {
    constructor (props) {
        super (props) 
    }
    

    render () {
        const {events} = this.props
        if (!events.length) return (
            <div className="calendar-events">
                <h1 className="no-events-placeholder">No Events!</h1>
            </div>
        )

        let lastEventDay = new Date(events[0].start_day)

        let currentDayEvents = []
        const eventsToDisplay = []

        events.forEach((event, idx) => {
            const splitTime = event.start_time.split(":")
            const dateTime = (hours12(parseInt(splitTime[0]))) + ":" + (splitTime[1]) + (parseInt(splitTime[0]) > 11 ? " PM" : " AM")
            
            const currentEventDay = new Date(event.start_day) 

            if (currentEventDay < this.props.selectedDate) return

            // Check if same day
            if (!sameDay(lastEventDay, currentEventDay) || idx === 0) {
                if (idx !== 0) {
                    eventsToDisplay.push(
                        <div className="all-day-events" key={`all-day-events-${idx}`}>
                            {currentDayEvents}
                        </div>
                    )
                    currentDayEvents = []
                }
                currentDayEvents.push(<span key={`date-divider-${idx}`} className="day-divider">{`${DAYS[currentEventDay.getDay()]}, ${MONTHS[currentEventDay.getMonth()]} ${currentEventDay.getDate()} `}</span>)
                lastEventDay = currentEventDay
            }
            // Push event
             currentDayEvents.push(
                <Link className="event-link" to={`/events/${event.id}`} key={`calendar-show-events-${event.id}`}>
                    <li className="event-li">
                        <span className="time">{dateTime}</span>
                        <div className="content">
                            <span className="group-name">{event.groupName}</span>
                            <span className="name">{event.name}</span>
                            <span className="attendees">{event.user_ids.length} Members going</span>
                        </div>
                    </li>
                </Link>
            )
        })
        eventsToDisplay.push(
            <div className="all-day-events" key="all-day-events-last">
                {currentDayEvents}
            </div>
        )
        return (
            <ul className="calendar-events">
                {eventsToDisplay}
            </ul>
        )
    }
} 