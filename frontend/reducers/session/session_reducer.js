import { LOG_IN_USER, LOG_OUT_USER } from "../../actions/session_actions";
import { merge } from 'lodash'

const _nullUser = {
    currentUserId: null
}

export default (state = _nullUser, action) => {
    Object.freeze(state);

    switch (action.type) {
        case LOG_IN_USER:
            return merge({}, { currentUserId: action.user.id })
        case LOG_OUT_USER:
            return _nullUser
        default:
            return state
    }

}