import ContentScroller from "./content_scroller";
import { connect } from 'react-redux'

const dummyData = {
    groups: [
        {
            name: "Group",
            description: "This is a group description",
            numberOfEvents: 30,
            members: 100,
            id: 1
        },
        {
            name: "Group",
            description: "This is a group description",
            numberOfEvents: 30,
            members: 100,
            id: 2
        },
        {
            name: "Group",
            description: "This is a group description",
            numberOfEvents: 30,
            members: 100,
            id: 3
        },
        {
            name: "Group",
            description: "This is a group description",
            numberOfEvents: 30,
            members: 100,
            id: 4
        }
    ]
}

const mSP = state => {
    return {
        groups: dummyData.groups,
        contentType: "groups"
    }
}


export default connect(mSP)(ContentScroller)