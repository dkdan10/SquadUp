import React from "react"

export default class CalenderContent extends React.Component {
    constructor (props) {
        super (props) 
    }

    render () {
        const eventLis = this.props.events.map(event => {
            const dateTime = (event.startTime.getHours() % 12) + ":" + (event.startTime.getMinutes()) + (event.startTime.getHours() > 12 ? " PM" : " AM")

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