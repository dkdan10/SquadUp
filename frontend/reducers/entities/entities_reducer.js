import { combineReducers } from "redux";
import users from "./users_reducer";
import locations from "./locations_reducer";


const entitiesReducer = combineReducers({ 
    users,
    locations
});

export default entitiesReducer;