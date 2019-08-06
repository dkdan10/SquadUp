import React from 'react';
import {connect} from 'react-redux';
import { fetchEvent } from '../../../actions/event_actions';
import EventShowHeader from './event_show_header';
import EventShowBody from './event_show_body';

class EventShowPage extends React.Component {

    componentDidMount() {
        const eventId = this.props.match.params.eventId
        this.props.fetchEvent(eventId)
        window.scrollTo(0, 0)
    }

    render () {
        const { event, group, organizer } = this.props
        if (!event || !group || !organizer) return null

        return (
            <div className="event-show-container">
                <EventShowHeader event={event} group={group} organizer={organizer} />
                <EventShowBody event={event} group={group} organizer={organizer} />
            </div>
        )
    }
}


const msp = (state, ownProps) => {
    const eventId = ownProps.match.params.eventId
    const event = state.entities.events[eventId]
    if (!event) return {}
    return {
        event: event,
        currentUserId: state.session.currentUserId,
        group: state.entities.groups[event.group_id],
        organizer: state.entities.users[event.organizer_id] || { name: "" }
    }
}

const mdp = (dispatch) => {
    return {
        fetchEvent: (eventId) => dispatch(fetchEvent(eventId)),
    }
}

export default connect(msp, mdp)(EventShowPage)