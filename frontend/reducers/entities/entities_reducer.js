import { combineReducers } from "redux";
import users from "./users_reducer";
import locations from "./locations_reducer";
import events from "./events_reducer";
import groups from "./groups_reducer";
import channels from './channels_reducer';


const entitiesReducer = combineReducers({ 
    users,
    locations,
    events,
    groups,
    channels
});

export default entitiesReducer;