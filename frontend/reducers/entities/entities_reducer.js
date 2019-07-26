import { combineReducers } from "redux";
import users from "./session_reducer";


const entitiesReducer = combineReducers({ 
    users 
});

export default entitiesReducer;