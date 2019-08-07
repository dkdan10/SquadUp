
import { UPDATE_SEARCH } from "../../actions/filter_actions"

export default (state = { search: "" }, action) => {
    Object.freeze(state)
    switch (action.type) {
        case UPDATE_SEARCH:
            return Object.assign({}, state, { search: action.value })
        default:
            return state
    }
}
