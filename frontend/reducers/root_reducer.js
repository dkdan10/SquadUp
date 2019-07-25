import { combineReducers } from "redux";
import entities from "./entities/entities_reducer";


const rootReducer = combineReducers({
    entities
});

export default rootReducer;