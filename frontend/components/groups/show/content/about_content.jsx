import React from 'react'
import { hours12 } from "../../../../util/helper_functions"
import {Link, withRouter} from 'react-router-dom'

class AboutShowPage extends React.Component {

    constructor(props) {
        super(props)
        this.sendOwnerMessage = this.sendOwnerMessage.bind(this)
    }

    sendOwnerMessage () {

        if (!this.props.currentUserId) {
            this.props.history.push('/login')
            return
        }

        this.props.createChannel(this.props.owner.id)
            .then(res => {
                this.props.history.push(`/messages/${res.channelData.channel.id}`)
            })
    }

    render () {

        const eventLis = this.props.events.map(event => {

            const pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
            const dt = new Date(event.start_day.replace(pattern, '$3-$2-$1'));

            const splitTime = event.start_time.split(":")
            const dateTime = (hours12(parseInt(splitTime[0]))) + ":" + (splitTime[1]) + (parseInt(splitTime[0]) > 11 ? " PM" : " AM")
            const dateString = dt.toDateString().slice(0, -5) + ", " + dateTime


            return (
                <Link to={`/events/${event.id}`} key={`group-show-events-${event.id}`}>
                    <li  className="card-event">
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

        const groupMemberLis = []
        for (let i = 0; (i < this.props.groupMembers.length) && (i < 15); i++) {
            groupMemberLis.push(
                <i key={`member-list-${i}`} className="user-image far fa-user-circle">
                    <span className="tooltiptext">{this.props.groupMembers[i].username}</span>
                </i>
            )          
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
                                {this.props.currentUserId === this.props.owner.id ? ( 
                                    <p className="message-owner">You are owner</p>
                                ) : (
                                    <p className="message-owner" onClick={this.sendOwnerMessage}>Message</p>
                                )}
                            </div>
                        </ul>
                    </div>
                    <div className="group-members">
                        <h2>Members ({this.props.group.memberIds.length})</h2>
                        <ul className="members-list">
                            {groupMemberLis}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(AboutShowPage)