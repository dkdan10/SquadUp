import { merge } from 'lodash'
import { RECEIVE_ALL_EVENTS, RECEIVE_EVENT, REMOVE_EVENT } from '../../actions/event_actions';
import { RECEIVE_GROUP } from '../../actions/group_actions';

const dummyEvents = {
        1: {
            startTime: new Date(),
            name: "Event",
            description: "This is an event description",
            location: "New York, NY",
            attendees: 20,
            id: 1
        },
        2: {
            startTime: new Date(),
            name: "Event",
            description: "This is an event description",
            location: "New York, NY",
            attendees: 20,
            id: 2
        },
        3: {
            startTime: new Date(),
            name: "Event",
            description: "This is an event description",
            location: "New York, NY",
            attendees: 20,
            id: 3
        },
        4: {
            startTime: new Date(),
            name: "Event",
            description: "This is an event description",
            location: "New York, NY",
            attendees: 20,
            id: 4
        }
}


export default (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_ALL_EVENTS: 
            return merge({}, action.events)
        case RECEIVE_EVENT:
            return Object.assign({}, state, {[action.event.id]: action.event})
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