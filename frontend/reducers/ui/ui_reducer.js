import { combineReducers } from "redux";
import modal from "./modal_reducer"
import filters from "../filters/filter_reducer"
import lastFetched from "../util_reducers/last_fetched_reducer"

const uiReducer = combineReducers({
    modal,
    filters,
    lastFetched
});

export default uiReducer;