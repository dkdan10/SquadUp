import { LOG_IN_USER, LOG_OUT_USER } from "../../actions/users_actions";

export default (state = {currentUserId: null}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case LOG_IN_USER:
            return { currentUserId: action.id }
        case LOG_OUT_USER:
            return {currentUserId: null}
        default:
            return state
    }

}