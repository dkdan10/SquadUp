import * as groupAPI from '../util/group_api'

export const RECEIVE_GROUPS = "RECEIVE_GROUPS"
export const RECEIVE_GROUP = "RECEIVE_GROUP"
export const REMOVE_GROUP = "REMOVE_GROUP"

export const fetchGroups = () => (dispatch, state) => (
    groupAPI.fetchGroups(state.ui.filters)
        .then(groupsData => dispatch(recieveGroups(groupsData)))
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

export const deleteGroup = (id) => dispatch => (
    groupAPI.deleteGroup(id)
        .then(groupData => dispatch(removeGroup(groupData.group.id)))
)

const recieveGroups = (groupsData) => ({
    type: RECEIVE_GROUPS,
    groupsData
})

export const recieveGroup = (groupData) => ({
    type: RECEIVE_GROUP,
    groupData
})

const removeGroup = (groupId) => ({
    type: REMOVE_GROUP,
    groupId
})
