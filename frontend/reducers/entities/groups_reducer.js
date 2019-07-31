import { merge } from 'lodash'

const dummyGroups = {
        1: {
            name: "Group",
            description: "This is a group description",
            numberOfEvents: 30,
            members: 100,
            id: 1
        },
        2: {
            name: "Group",
            description: "This is a group description",
            numberOfEvents: 30,
            members: 100,
            id: 2
        },
        3: {
            name: "Group",
            description: "This is a group description",
            numberOfEvents: 30,
            members: 100,
            id: 3
        },
        4: {
            name: "Group",
            description: "This is a group description",
            numberOfEvents: 30,
            members: 100,
            id: 4
        },
        5: {
            name: "Group",
            description: "This is a group description",
            numberOfEvents: 30,
            members: 100,
            id: 5
        },
        6: {
            name: "Group",
            description: "This is a group description",
            numberOfEvents: 30,
            members: 100,
            id: 6
        }
}


export default (state = dummyGroups, action) => {
    Object.freeze(state);

    switch (action.type) {
        default:
            return state
    }

}