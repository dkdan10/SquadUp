import { RECEIVE_ALL_LOCATIONS } from "../../actions/loaction_actions";
import { merge } from 'lodash'

export default (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_ALL_LOCATIONS:
            // if we don't want to merge
            return merge({}, action.locations)
        default:
            return state
    }

}