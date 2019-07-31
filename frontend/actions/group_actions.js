import * as groupAPI from '../util/group_api'

export const RECEIVE_ALL_GROUPS = "RECEIVE_ALL_GROUPS"
export const RECEIVE_GROUP = "RECEIVE_GROUP"
export const REMOVE_GROUP = "REMOVE_GROUP"

export const fetchGroups = () => dispatch => (
    groupAPI.fetchGroups()
        .then(groups => dispatch(recieveGroups(groups)))
)

export const fetchGroup = (id) => dispatch => (
    groupAPI.fetchGroup(id)
        .then(group => dispatch(recieveGroup(group)))
)

export const createGroup = (group) => dispatch => (
    groupAPI.createGroup(group)
        .then(group => dispatch(recieveGroup(group)))
)

export const updateGroup = (group) => dispatch => (
    groupAPI.updateGroup(group)
        .then(group => dispatch(recieveGroup(group)))
)

export const deleteGroup = (id) => dispatch (
    groupAPI.deleteGroup(id)
        .then(group => dispatch(removeGroup(group.id)))
)

const recieveGroups = (groups) => ({
    type: RECEIVE_ALL_GROUPS,
    groups
})

const recieveGroup = (group) => ({
    type: RECEIVE_GROUP,
    group
})

const removeGroup = (groupId) => ({
    type: REMOVE_GROUP,
    groupId
})
