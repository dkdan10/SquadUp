import * as eventAPI from '../util/event_api'

export const RECEIVE_ALL_EVENTS = "RECEIVE_ALL_EVENTS"
export const RECEIVE_EVENT = "RECEIVE_EVENT"
export const REMOVE_EVENT = "REMOVE_EVENT"

export const fetchEvents = () => dispatch => (
    eventAPI.fetchEvents()
        .then(events => dispatch(recieveEvents(events)))
)

export const fetchEvent = (id) => dispatch => (
    eventAPI.fetchEvent(id)
        .then(event => dispatch(recieveEvent(event)))
)

export const createEvent = (event) => dispatch => (
    eventAPI.createEvent(event)
        .then(event => dispatch(recieveEvent(event)))
)

export const updateEvent = (event) => dispatch => (
    eventAPI.updateEvent(event)
        .then(event => dispatch(recieveEvent(event)))
)

export const deleteEvent = (id) => dispatch => (
    eventAPI.deleteEvent(id)
        .then(event => dispatch(removeGroup(event.id)))
)


export const fetchUserGroupEvents = () => dispatch => (
    eventAPI.fetchUserGroupEvents()
        .then(events => dispatch(recieveEvents(events)))
)


const recieveEvents = (events) => ({
    type: RECEIVE_ALL_EVENTS,
    events
})

const recieveEvent = (event) => ({
    type: RECEIVE_EVENT,
    event
})

const removeEvent = (eventId) => ({
    type: REMOVE_EVENT,
    eventId
})
