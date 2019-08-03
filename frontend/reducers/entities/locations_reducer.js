import { RECEIVE_ALL_LOCATIONS } from "../../actions/loaction_actions";
import { merge } from 'lodash'
import { RECEIVE_GROUP } from "../../actions/group_actions";

export default (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_ALL_LOCATIONS:
            // if we don't want to merge
            return merge({}, action.locations)
        case RECEIVE_GROUP:
            return merge({}, state, {[action.groupData.location.id]: action.groupData.location})
        default:
            return state
    }

}