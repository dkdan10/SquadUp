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


export default class CalenderContent extends React.Component {
    constructor (props) {
        super (props) 
    }

    render () {
        const {events} = this.props
        if (!events.length) return null
        let lastEventDay = new Date(events[0].start_day)
        
        const eventLis = events.map((event, idx) => {
            const splitTime = event.start_time.split(":")
            const dateTime = (hours12(parseInt(splitTime[0]))) + ":" + (splitTime[1]) + (parseInt(splitTime[0]) > 11 ? " PM" : " AM")
            
            let dayText = null
            const currentEventDay = new Date(event.start_day) 
            if (!sameDay(lastEventDay, currentEventDay) || idx === 0) {
                dayText = <span key={`date-divider-${idx}`} className="day-divider">{`${DAYS[currentEventDay.getDay()]}, ${MONTHS[currentEventDay.getMonth()]} ${currentEventDay.getDate()} `}</span>
                lastEventDay = currentEventDay
            }

            return (
                <section className="event-box" key={`section-${idx}`}>
                {dayText}
                <Link className="event-link" to={`/events/${event.id}`} key={`calender-show-events-${event.id}`}>
                    <li className={`${dayText ? "first-section-li" : ""}  event-li`}>
                        <span className="time">{dateTime}</span>
                        <div className="content">
                            <span className="group-name">{event.groupName}</span>
                            <span className="name">{event.name}</span>
                            <span className="attendees">{event.user_ids.length} Members going</span>
                        </div>
                    </li>
                </Link>
                </section>
            )
        })
        return (
            <ul className="calender-events">
                {eventLis}
            </ul>
        )
    }
} 