import { combineReducers } from "redux";
import entities from "./entities/entities_reducer";
import session from "./session/session_reducer";
import errors from "./errors/errors_reducer";
import ui from "./ui/ui_reducer";

const rootReducer = combineReducers({
    entities,
    session,
    errors,
    ui
});

export default rootReducer;