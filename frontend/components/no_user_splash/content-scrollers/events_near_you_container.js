import ContentScroller from "./content_scroller";
import {connect} from 'react-redux'

const dummyData = {
    events: [
        {
            startTime: new Date(),
            name: "Event",
            description: "This is an event description",
            location: "New York, NY",
            attendees: 20,
            id: 1
        },
        {
            startTime: new Date(),
            name: "Event",
            description: "This is an event description",
            location: "New York, NY",
            attendees: 20,
            id: 2
        },
        {
            startTime: new Date(),
            name: "Event",
            description: "This is an event description",
            location: "New York, NY",
            attendees: 20,
            id: 3
        },
        {
            startTime: new Date(),
            name: "Event",
            description: "This is an event description",
            location: "New York, NY",
            attendees: 20,
            id: 4
        }
    ]
}

const mSP = state => {
    return {
        events: dummyData.events,
        contentType: "events"
    }
}


export default connect(mSP)(ContentScroller)