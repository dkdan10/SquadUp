import { RECIEVE_SESSION_ERRORS, LOG_IN_USER, CLEAR_SESSION_ERRORS } from "../../actions/session_actions";

export default (state = [], action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECIEVE_SESSION_ERRORS:
            return action.errors.slice()
        case LOG_IN_USER:
            return []
        case CLEAR_SESSION_ERRORS:
            return []
        default:
            return state
    }

}