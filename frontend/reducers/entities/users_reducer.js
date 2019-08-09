import { RECIEVE_USERS, LOG_IN_USER, RECIEVE_USER} from "../../actions/session_actions";
import {merge} from 'lodash'
import { RECEIVE_GROUP } from "../../actions/group_actions";
import { RECEIVE_EVENT } from "../../actions/event_actions";
import { RECEIVE_CHANNEL, RECEIVE_CHANNELS } from "../../actions/messaging_actions";

export default (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECIEVE_USERS:
            // if we don't want to merge
            return merge({}, action.users)
        case LOG_IN_USER:
            return merge({}, state, {[action.user.id]: action.user})
        case RECEIVE_GROUP:
            return Object.assign({}, state, action.groupData.members)
        case RECIEVE_USER: 
            return Object.assign({}, state, { [action.user.id]: action.user })
        case RECEIVE_EVENT:
            return merge({}, state, action.eventData.rsvpers)
        case RECEIVE_CHANNEL:
            return merge({}, state, action.channelData.members)
        case RECEIVE_CHANNELS:
            return merge({}, state, action.channelData.members)
        default:
            return state
    }

}