import * as RsvpEventAPI from "../util/rsvp_event_api"
import {recieveEvent} from "./event_actions"

export const rsvpToEvent = (eventId) => dispatch =>  {
    return RsvpEventAPI.rsvpToEvent(eventId)
        .then(eventData => dispatch(recieveEvent(eventData)))
}

export const unrsvpFromEvent = (eventId) => dispatch => {
    return RsvpEventAPI.unrsvpFromEvent(eventId)
        .then(eventData => dispatch(recieveEvent(eventData)))
}