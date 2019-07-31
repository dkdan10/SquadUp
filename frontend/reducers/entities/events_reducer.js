import { merge } from 'lodash'

const dummyEvents = {
        1: {
            startTime: new Date(),
            name: "Event",
            description: "This is an event description",
            location: "New York, NY",
            attendees: 20,
            id: 1
        },
        2: {
            startTime: new Date(),
            name: "Event",
            description: "This is an event description",
            location: "New York, NY",
            attendees: 20,
            id: 2
        },
        3: {
            startTime: new Date(),
            name: "Event",
            description: "This is an event description",
            location: "New York, NY",
            attendees: 20,
            id: 3
        },
        4: {
            startTime: new Date(),
            name: "Event",
            description: "This is an event description",
            location: "New York, NY",
            attendees: 20,
            id: 4
        }
}


export default (state = dummyEvents, action) => {
    Object.freeze(state);

    switch (action.type) {
        default:
            return state
    }

}