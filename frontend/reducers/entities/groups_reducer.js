import { merge } from 'lodash'
import { RECEIVE_ALL_GROUPS, RECEIVE_GROUP, REMOVE_GROUP } from '../../actions/group_actions';
import { RECEIVE_EVENT } from '../../actions/event_actions';


export default (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_ALL_GROUPS:
            Object.keys(action.groups).forEach(key => {
                action.groups[key].numberOfEvents = 100
            })
            return merge({}, action.groups)
        case RECEIVE_GROUP:
            action.groupData.group.numberOfEvents = 30
            return Object.assign({}, state, {[action.groupData.group.id]: action.groupData.group})
        case REMOVE_GROUP: {
            let newState = merge({}, state)
            delete newState[action.groupId]
            return newState
        }
        case RECEIVE_EVENT:
            return merge({}, state, action.eventData.group)
        default:
            return state
    }

}