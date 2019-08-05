import React from 'react'
import {connect} from 'react-redux'
import { fetchEvent } from '../../../actions/event_actions';

class EventShowPage extends React.Component {

    componentDidMount() {
        const eventId = this.props.match.params.eventId
        this.props.fetchEvent(eventId)
        window.scrollTo(0, 0)
    }

    render () {
        const { event, group, organizer } = this.props
        if (!event) return null
        debugger
        return (
            <>
                <h1>{event.name}</h1>
                <h1>{event.start_day}</h1>
                <h1>{event.start_time}</h1>
                <h1>{event.address}</h1>
                <h1>{event.lat}</h1>
                <h1>{event.lng}</h1>
                <h1>{event.description}</h1>
                <h1>{group.name}</h1>
                <h1>{organizer.name}</h1>
            </>
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