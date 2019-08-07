import { RECEIVE_EVENTS } from "../../actions/event_actions";



export default (state = { eventIds: [] }, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_EVENTS:
            return Object.assign({}, state, { eventIds: action.eventsData.fetchedEventIds })
        default:
            return state
    }
}
