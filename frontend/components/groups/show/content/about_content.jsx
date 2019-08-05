import React from 'react'
import { hours12 } from "../../../../util/helper_functions"

export default class AboutShowPage extends React.Component {

    render () {

        const eventLis = this.props.events.map(event => {

            var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
            var dt = new Date(event.start_day.replace(pattern, '$3-$2-$1'));

            const splitTime = event.start_time.split(":")
            const dateTime = (hours12(parseInt(splitTime[0]))) + ":" + (splitTime[1]) + (parseInt(splitTime[0]) > 11 ? " PM" : " AM")
            const dateString = dt.toDateString().slice(0, -5) + ", " + dateTime


            return (
                <li key={`group-show-events-${event.id}`} className="card-event">
                    <ul className="card-content">
                        <div className="top-card">
                            <span className="time">{dateString}</span>
                            <span className="name">{event.name}</span>
                            <span className="description">{event.description}</span>
                            <span className="location"><i className="fas fa-map-marker-alt"></i>{event.address}</span>
                        </div>
                        <div className="bottom-card">
                            <span className="attendees">{event.attendees} attendees</span>
                            <button className="attend-button">Attend</button>
                        </div>
                    </ul>
                </li>
            )
        })

        let tempUserIcons = []
        for (let i = 0; (i < this.props.group.memberIds.length) && (i < 15); i++) {
            tempUserIcons.push(<i key={`member-list-${i}`} className="user-image far fa-user-circle"></i>)          
        }

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
                <div className="about-right-coloumn">
                    <div className="group-organizers">
                        <h2>Organizers</h2>
                        <ul className="organizers-list">
                            <i className="user-image far fa-user-circle"></i>
                            <div className="organizer-text">
                                <p className="owner-name">{this.props.owner.username}</p>
                                <p className="message-owner">Message</p>
                            </div>
                        </ul>
                    </div>
                    <div className="group-members">
                        <h2>Members ({this.props.group.memberIds.length})</h2>
                        <ul className="members-list">
                            {tempUserIcons}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}