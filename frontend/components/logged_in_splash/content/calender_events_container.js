import CalenderContent from "./calender_events";
import { connect } from 'react-redux'
import { fetchUserGroupEvents } from "../../../actions/event_actions";


const mSP = state => {
    const currentUser = state.entities.users[state.session.currentUserId]
    let events = [];

    if (currentUser.joined_group_event_ids) {
        currentUser.joined_group_event_ids.forEach(eventId => {
            const event = state.entities.events[eventId]
            if (event) events.push(event)
        })
    }
    return {
        events: events,
    }
}

const mDP = dispatch => {
    return {
        fetchUserGroupEvents: () => dispatch(fetchUserGroupEvents())
    }
}


export default connect(mSP, mDP)(CalenderContent)