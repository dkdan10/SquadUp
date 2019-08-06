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
        .then(eventData => dispatch(recieveEvent(eventData)))
)

export const createEvent = (event) => dispatch => (
    eventAPI.createEvent(event)
        .then(eventData => dispatch(recieveEvent(eventData)))
)

export const updateEvent = (event) => dispatch => (
    eventAPI.updateEvent(event)
        .then(eventData => dispatch(recieveEvent(eventData)))
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

export const recieveEvent = (eventData) => ({
    type: RECEIVE_EVENT,
    eventData
})

const removeEvent = (eventId) => ({
    type: REMOVE_EVENT,
    eventId
})
