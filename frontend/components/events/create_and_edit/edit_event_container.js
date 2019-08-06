import EventForm from "./event_form"
import { updateEvent, fetchEvent } from '../../../actions/event_actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import React from 'react'
import moment from 'moment'

const msp = (state, ownProps) => {

    const event = state.entities.events[ownProps.match.params.eventId]
    
    return {
        event,
        currentUserId: state.session.currentUserId,
        editForm: true
    }
}

const mdp = (dispatch) => {
    return {
        fetchEvent: (id) => dispatch(fetchEvent(id)),
        action: (event) => dispatch(updateEvent(event))
    }
}

class EditGroupForm extends React.Component {

    componentDidMount() {
        const currentUserId = this.props.currentUserId
        this.props.fetchEvent(this.props.match.params.eventId)
            .then((res) => {
                if (res.eventData.event.organizer_id !== currentUserId) {
                    this.props.history.push(`/events/${res.eventData.event.id}`)
                }
            })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.eventId !== this.props.match.params.eventId) {
            const eventId = this.props.match.params.eventId
            this.props.fetchEvent(eventId).then((res) => {
                if (res.eventData.event.organizer_id !== currentUserId) {
                    this.props.history.push(`/events/${res.eventData.event.id}`)
                }
            })
        }
    }

    render() {
        let {event} = this.props
        if (!event) return null
        if (event.organizer_id !== this.props.currentUserId) this.props.history.push(`/events/${event.id}`)
        event.start_day = moment(event.start_day, "YYYY/MM/DD")
        return (
            <EventForm editForm={this.props.editForm} action={this.props.action} event={event} />
        )
    }
}

export default connect(msp, mdp)(withRouter(EditGroupForm))
