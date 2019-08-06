import React from 'react';
import {connect} from 'react-redux';
import { fetchEvent } from '../../../actions/event_actions';
import EventShowHeader from './event_show_header';
import EventShowBody from './event_show_body';
import { rsvpToEvent, unrsvpFromEvent } from '../../../actions/rsvp_event_actions';

class EventShowPage extends React.Component {

    componentDidMount() {
        const eventId = this.props.match.params.eventId
        this.props.fetchEvent(eventId)
        window.scrollTo(0, 0)
    }

    render () {
        const { event, group, organizer, rsvpedMembers, currentUserId, rsvpToEvent, unrsvpToEvent } = this.props
        if (!event || !group || !organizer) return null

        return (
            <div className="event-show-container">
                <EventShowHeader 
                    currentUserId={currentUserId} 
                    event={event} 
                    group={group} 
                    organizer={organizer} 
                    rsvpToEvent={rsvpToEvent}
                    unrsvpToEvent={unrsvpToEvent}
                />
                <EventShowBody 
                    event={event} 
                    group={group} 
                    organizer={organizer} 
                    rsvpedMembers={rsvpedMembers}
                />
            </div>
        )
    }
}


const msp = (state, ownProps) => {
    const eventId = ownProps.match.params.eventId
    const event = state.entities.events[eventId]
    if (!event || !event.user_ids) return {}
    const rsvpedMembers = [];
    event.user_ids.forEach(userId => {
        const userToAdd = state.entities.users[userId]
        if (userToAdd) rsvpedMembers.push(userToAdd)
    })
    return {
        event: event,
        currentUserId: state.session.currentUserId,
        group: state.entities.groups[event.group_id],
        rsvpedMembers,
        organizer: state.entities.users[event.organizer_id] || { name: "" }
    }
}

const mdp = (dispatch) => {
    return {
        fetchEvent: (eventId) => dispatch(fetchEvent(eventId)),
        rsvpToEvent: (eventId) => dispatch(rsvpToEvent(eventId)),
        unrsvpToEvent: (eventId) => dispatch(unrsvpFromEvent(eventId))
    }
}

export default connect(msp, mdp)(EventShowPage)