import { RECEIVE_EVENTS } from "../../actions/event_actions";
import { RECEIVE_GROUPS } from "../../actions/group_actions";



export default (state = { eventIds: [], groupIds: [] }, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_EVENTS:
            return Object.assign({}, state, { eventIds: action.eventsData.fetchedEventIds })
        case RECEIVE_GROUPS:
            return Object.assign({}, state, { groupIds: action.groupsData.fetchedGroupIds })
        default:
            return state
    }
}
