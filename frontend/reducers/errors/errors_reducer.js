import { combineReducers } from "redux";
import session from "./session_errors";


const errorsReducer = combineReducers({
    session
});

export default errorsReducer;