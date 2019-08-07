import * as eventAPI from '../util/event_api'

export const RECEIVE_EVENTS = "RECEIVE_EVENTS"
export const RECEIVE_EVENT = "RECEIVE_EVENT"
export const REMOVE_EVENT = "REMOVE_EVENT"

export const fetchEvents = () => (dispatch, state) => (
    eventAPI.fetchEvents(state.ui.filters)
        .then(eventsData => dispatch(recieveEvents(eventsData)))
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
        .then(event => dispatch(removeEvent(event.id)))
)


export const fetchUserGroupEvents = () => (dispatch, state) => (
    eventAPI.fetchUserGroupEvents(state.ui.filters)
        .then(eventsData => dispatch(recieveEvents(eventsData)))
)

const recieveEvents = (eventsData) => ({
    type: RECEIVE_EVENTS,
    eventsData
})

export const recieveEvent = (eventData) => ({
    type: RECEIVE_EVENT,
    eventData
})

const removeEvent = (eventId) => ({
    type: REMOVE_EVENT,
    eventId
})
