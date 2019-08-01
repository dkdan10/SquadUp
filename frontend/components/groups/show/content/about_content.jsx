import React from 'react'

export default class AboutShowPage extends React.Component {

    render () {

        const eventLis = this.props.events.map(event => {

            const dateTime = (event.startTime.getHours() % 12) + ":" + (event.startTime.getMinutes()) + (event.startTime.getHours() > 12 ? " PM" : " AM")
            const dateString = event.startTime.toDateString().slice(0, -5) + ", " + dateTime

            return (
                <li key={`group-show-events-${event.id}`} className="card-event">
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
        })

        return (
            <div className="about-content">
                <div className="about-left-coloumn">
                    <div className="description" >
                        <h2>What we're about</h2>
                        <p>{this.props.group.description}</p>
                    </div>
                    <div className="upcoming-events-list">
                        <h2>Upcoming events ({this.props.events.length})</h2>
                        <ul>
                            {eventLis}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}