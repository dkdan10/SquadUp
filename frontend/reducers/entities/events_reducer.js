import { merge } from 'lodash'
import { RECEIVE_EVENTS, RECEIVE_EVENT, REMOVE_EVENT } from '../../actions/event_actions';
import { RECEIVE_GROUP } from '../../actions/group_actions';


export default (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_EVENTS: 
            return merge({}, state, action.eventsData.events)
        case RECEIVE_EVENT:
            return Object.assign({}, state, {[action.eventData.event.id]: action.eventData.event})
        case REMOVE_EVENT:
            let newState = merge({}, state)
            delete newState[action.eventId]
            return newState 
        case RECEIVE_GROUP:
            return Object.assign({}, state, action.groupData.events)
        default:
            return state
    }

}