import React from "react"
import { hours12 } from "../../../util/helper_functions";

export default class CalenderContent extends React.Component {
    constructor (props) {
        super (props) 
    }

    
    render () {
        const eventLis = this.props.events.map(event => {

            const splitTime = event.start_time.split(":")
            const dateTime = (hours12(parseInt(splitTime[0]))) + ":" + (splitTime[1]) + (parseInt(splitTime[0]) > 11 ? " PM" : " AM")

            return (
                <li key={event.id} className="event-li">
                    <span className="time">{dateTime}</span>
                    <div className="content">
                        <span className="group-name">Group Name</span>
                        <span className="name">{event.name}</span>
                        <span className="attendees">{event.attendees} Members going</span>
                    </div>
                </li>
            )
        })
        return (
            <ul className="calender-events">
                {eventLis}
            </ul>
        )
    }
} 