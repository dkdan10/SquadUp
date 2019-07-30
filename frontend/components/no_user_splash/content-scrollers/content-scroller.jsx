import React from 'react'

const dummyData = {
    events: [
        {
            startTime: new Date(),
            name: "Event",
            description: "This is an event description",
            location: "New York, NY",
            attendees: 20,
            id: 1
        },
        {
            startTime: new Date(),
            name: "Event",
            description: "This is an event description",
            location: "New York, NY",
            attendees: 20,
            id: 2
        },
        {
            startTime: new Date(),
            name: "Event",
            description: "This is an event description",
            location: "New York, NY",
            attendees: 20,
            id: 3
        },
        {
            startTime: new Date(),
            name: "Event",
            description: "This is an event description",
            location: "New York, NY",
            attendees: 20,
            id: 4
        }
    ]
}

export default class ContentScroller extends React.Component {

    constructor (props) {
        super(props)
        this.state = dummyData
    } 

    render() {
        const contentLis = this.state.events.map(event => {
            const dateTime = (event.startTime.getHours() % 12) + ":" + (event.startTime.getMinutes()) + (event.startTime.getHours() > 12 ? " PM" : " AM")
            const dateString = event.startTime.toDateString().slice(0, -5) + ", " + dateTime
            return (
            <li className="card" key={event.id}>
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
        });

        return (
            <div className="splash-content-scroller" >
                <h1 className="splash-content-header">Events near you</h1>
                <h2 className="splash-content-description">See what's happening soon in your area</h2>
                <ul className="scrolling-wrapper">
                    {contentLis}
                </ul>
            </div>
        )
    }

}