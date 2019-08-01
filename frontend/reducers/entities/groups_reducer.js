import { merge } from 'lodash'
import { RECEIVE_ALL_GROUPS, RECEIVE_GROUP, REMOVE_GROUP } from '../../actions/group_actions';

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


export default (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_ALL_GROUPS:
            Object.keys(action.groups).forEach(key => {
                action.groups[key].numberOfEvents = 100
                action.groups[key].members = 30
            })
            return merge({}, action.groups)
        case RECEIVE_GROUP:
            action.group.members = 2442
            action.group.numberOfEvents = 30
            return merge({}, state, {[action.group.id]: action.group})
        case REMOVE_GROUP: {
            let newState = merge({}, state)
            delete newState[action.groupId]
            return newState
        }
        default:
            return state
    }

}