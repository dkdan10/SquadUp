import { RECIEVE_USERS, CREATE_USER, LOG_IN_USER } from "../../actions/users_actions";


import {merge} from 'lodash'
export default (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECIEVE_USERS:
            // if we don't want to merge
            return merge({}, action.users)
        case CREATE_USER:
            return merge({}, state, {[action.user.id]: action.user})
        default:
            return state
    }

}