import React from "react"
import { hours12 } from "../../../util/helper_functions";
import {Link} from "react-router-dom"

export default class CalenderContent extends React.Component {
    constructor (props) {
        super (props) 
    }


    render () {
        const eventLis = this.props.events.map(event => {

            const splitTime = event.start_time.split(":")
            const dateTime = (hours12(parseInt(splitTime[0]))) + ":" + (splitTime[1]) + (parseInt(splitTime[0]) > 11 ? " PM" : " AM")

            return (
                <Link className="event-link" to={`/events/${event.id}`} key={`calender-show-events-${event.id}`}>
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
        return (
            <ul className="calender-events">
                {eventLis}
            </ul>
        )
    }
} 